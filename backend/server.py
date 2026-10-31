"""
YSK Family Finance - FastAPI REST API & Static Server
Provides multi-device synchronization over local network or cloud.
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import database

database.init_db()

app = FastAPI(
    title="YSK Family Finance API",
    description="Smart Family Finance Management System Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionModel(BaseModel):
    id: str
    date: str
    type: str
    category: str
    amount: float
    currency: str
    member: str
    payment: str
    note: Optional[str] = ""

class DebtModel(BaseModel):
    id: str
    type: str
    person: str
    amount: float
    currency: str
    dueDate: Optional[str] = ""
    status: str
    note: Optional[str] = ""

class GoalModel(BaseModel):
    id: str
    title: str
    targetAmount: float
    currentAmount: float
    currency: str
    targetDate: Optional[str] = ""

@app.get("/api/health")
def health():
    return {"status": "ok", "version": "1.0.0", "name": "YSK Family Finance"}

@app.get("/api/transactions")
def get_transactions():
    conn = database.get_connection()
    rows = conn.execute("SELECT * FROM transactions ORDER BY date DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/transactions")
def create_transaction(tx: TransactionModel):
    conn = database.get_connection()
    try:
        conn.execute("""
            INSERT OR REPLACE INTO transactions (id, date, type, category, amount, currency, member, payment, note)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (tx.id, tx.date, tx.type, tx.category, tx.amount, tx.currency, tx.member, tx.payment, tx.note))
        conn.commit()
    finally:
        conn.close()
    return {"success": True, "id": tx.id}

@app.delete("/api/transactions/{tx_id}")
def delete_transaction(tx_id: str):
    conn = database.get_connection()
    conn.execute("DELETE FROM transactions WHERE id = ?", (tx_id,))
    conn.commit()
    conn.close()
    return {"success": True}

# Serve root web static files (PWA)
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app.mount("/", StaticFiles(directory=ROOT_DIR, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    print("Starting YSK Family Finance API Server...")
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
