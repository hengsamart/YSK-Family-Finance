/**
 * YSK Family Finance - Storage Manager
 * Handles local persistence, CRUD operations, export/import and demo data.
 */

class StorageManager {
  constructor() {
    this.STORAGE_KEYS = {
      TRANSACTIONS: 'ysk_transactions',
      BUDGETS: 'ysk_budgets',
      DEBTS: 'ysk_debts',
      GOALS: 'ysk_goals',
      SETTINGS: 'ysk_settings'
    };

    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS)) {
      this.loadDemoData();
    }
  }

  loadDemoData() {
    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = String(today.getMonth() + 1).padStart(2, '0');

    const demoTransactions = [
      {
        id: 'tx_01',
        date: `${curYear}-${curMonth}-01`,
        type: 'income',
        category: 'catSalary',
        amount: 1800,
        currency: 'USD',
        member: 'memberDad',
        payment: 'payAba',
        note: 'ប្រាក់ខែប្រចាំខែ (Daddy Salary)'
      },
      {
        id: 'tx_02',
        date: `${curYear}-${curMonth}-02`,
        type: 'income',
        category: 'catBusiness',
        amount: 950,
        currency: 'USD',
        member: 'memberMom',
        payment: 'payAcleda',
        note: 'ចំណូលលក់ដូរអនឡាញ (Mom Online Store)'
      },
      {
        id: 'tx_03',
        date: `${curYear}-${curMonth}-03`,
        type: 'expense',
        category: 'catHousing',
        amount: 450,
        currency: 'USD',
        member: 'memberShared',
        payment: 'payAba',
        note: 'ថ្លៃផ្ទះប្រចាំខែ (House Rental)'
      },
      {
        id: 'tx_04',
        date: `${curYear}-${curMonth}-04`,
        type: 'expense',
        category: 'catUtilities',
        amount: 320000,
        currency: 'KHR',
        member: 'memberShared',
        payment: 'payAba',
        note: 'ថ្លៃទឹក ភ្លើង និងអ៊ីនធឺណិត (EDC & Water & Wi-Fi)'
      },
      {
        id: 'tx_05',
        date: `${curYear}-${curMonth}-05`,
        type: 'expense',
        category: 'catFood',
        amount: 800000,
        currency: 'KHR',
        member: 'memberMom',
        payment: 'payCash',
        note: 'ទិញម្ហូបផ្សារសម្រាប់ ១ សប្ដាហ៍ (Weekly Groceries)'
      },
      {
        id: 'tx_06',
        date: `${curYear}-${curMonth}-08`,
        type: 'expense',
        category: 'catEducation',
        amount: 300,
        currency: 'USD',
        member: 'memberSon',
        payment: 'payAba',
        note: 'បង់ថ្លៃសាលារៀនកូន (School Tuition)'
      },
      {
        id: 'tx_07',
        date: `${curYear}-${curMonth}-10`,
        type: 'expense',
        category: 'catTransport',
        amount: 160000,
        currency: 'KHR',
        member: 'memberDad',
        payment: 'payAba',
        note: 'ចាក់សាំងរថយន្ត និងម៉ូតូ (Gasoline)'
      },
      {
        id: 'tx_08',
        date: `${curYear}-${curMonth}-12`,
        type: 'expense',
        category: 'catFood',
        amount: 65,
        currency: 'USD',
        member: 'memberShared',
        payment: 'payAba',
        note: 'ញ៉ាំអាហារពេលល្ងាចជុំគ្រួសារចុងសប្ដាហ៍ (Family Dinner)'
      },
      {
        id: 'tx_09',
        date: `${curYear}-${curMonth}-15`,
        type: 'expense',
        category: 'catHealth',
        amount: 50,
        currency: 'USD',
        member: 'memberDaughter',
        payment: 'payCash',
        note: 'ទិញវីតាមីន និងពិនិត្យសុខភាព (Health & Vitamins)'
      },
      {
        id: 'tx_10',
        date: `${curYear}-${curMonth}-18`,
        type: 'expense',
        category: 'catEntertainment',
        amount: 45,
        currency: 'USD',
        member: 'memberShared',
        payment: 'payAba',
        note: 'ដំណើរកម្សាន្ត និងមើលកុន (Cinema & Leisure)'
      },
      {
        id: 'tx_11',
        date: `${curYear}-${curMonth}-20`,
        type: 'income',
        category: 'catFreelance',
        amount: 350,
        currency: 'USD',
        member: 'memberDad',
        payment: 'payAba',
        note: 'គម្រោងការងារបន្ថែមចុងសប្ដាហ៍ (Freelance Project)'
      }
    ];

    const demoBudgets = {
      catFood: 450,          // $450/month
      catHousing: 500,       // $500/month
      catUtilities: 120,     // $120/month
      catTransport: 100,     // $100/month
      catEducation: 350,     // $350/month
      catEntertainment: 100, // $100/month
      catHealth: 150,        // $150/month
      catShopping: 120       // $120/month
    };

    const demoDebts = [
      {
        id: 'debt_01',
        type: 'i_owe', // I owe someone
        person: 'ធនាគារ ABA (ABA Home Loan)',
        amount: 15000,
        currency: 'USD',
        dueDate: `${curYear}-12-30`,
        status: 'pending',
        note: 'កម្ចីទិញផ្ទះរំលស់'
      },
      {
        id: 'debt_02',
        type: 'owed_to_me', // Someone owes me
        person: 'ពូ សុខ (Uncle Sok)',
        amount: 500,
        currency: 'USD',
        dueDate: `${curYear}-${curMonth}-28`,
        status: 'pending',
        note: 'ខ្ចីបង្វិលការងាររកស៊ី'
      }
    ];

    const demoGoals = [
      {
        id: 'goal_01',
        title: 'កញ្ចប់ប្រាក់សន្សំគ្រាអាសន្ន (Emergency Fund)',
        targetAmount: 5000,
        currentAmount: 3200,
        currency: 'USD',
        targetDate: `${curYear}-12-31`,
        category: 'safety'
      },
      {
        id: 'goal_02',
        title: 'ដំណើរកម្សាន្តគ្រួសារទៅសៀមរាប (Siem Reap Vacation)',
        targetAmount: 800,
        currentAmount: 650,
        currency: 'USD',
        targetDate: `${curYear}-${curMonth}-25`,
        category: 'travel'
      },
      {
        id: 'goal_03',
        title: 'ទិញកុំព្យូទ័រសិក្សាសម្រាប់កូន (Study Laptop)',
        targetAmount: 900,
        currentAmount: 450,
        currency: 'USD',
        targetDate: `${curYear + 1}-03-01`,
        category: 'education'
      }
    ];

    localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(demoTransactions));
    localStorage.setItem(this.STORAGE_KEYS.BUDGETS, JSON.stringify(demoBudgets));
    localStorage.setItem(this.STORAGE_KEYS.DEBTS, JSON.stringify(demoDebts));
    localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(demoGoals));
  }

  // --- Transactions CRUD ---
  getTransactions() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed reading transactions:', e);
      return [];
    }
  }

  addTransaction(tx) {
    const list = this.getTransactions();
    tx.id = 'tx_' + Date.now();
    list.unshift(tx); // Add to top
    localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('transactionsUpdated'));
    return tx;
  }

  updateTransaction(id, updatedTx) {
    const list = this.getTransactions();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedTx };
      localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('transactionsUpdated'));
      return list[index];
    }
    return null;
  }

  deleteTransaction(id) {
    const list = this.getTransactions();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('transactionsUpdated'));
  }

  // --- Budgets CRUD ---
  getBudgets() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveBudget(category, amountUSD) {
    const budgets = this.getBudgets();
    budgets[category] = parseFloat(amountUSD) || 0;
    localStorage.setItem(this.STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
    window.dispatchEvent(new CustomEvent('budgetsUpdated'));
  }

  // --- Debts CRUD ---
  getDebts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.DEBTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addDebt(debt) {
    const list = this.getDebts();
    debt.id = 'debt_' + Date.now();
    list.unshift(debt);
    localStorage.setItem(this.STORAGE_KEYS.DEBTS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('debtsUpdated'));
    return debt;
  }

  updateDebt(id, updatedDebt) {
    const list = this.getDebts();
    const idx = list.findIndex(d => d.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedDebt };
      localStorage.setItem(this.STORAGE_KEYS.DEBTS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('debtsUpdated'));
      return list[idx];
    }
    return null;
  }

  deleteDebt(id) {
    const list = this.getDebts().filter(d => d.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.DEBTS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('debtsUpdated'));
  }

  // --- Savings Goals CRUD ---
  getGoals() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.GOALS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addGoal(goal) {
    const list = this.getGoals();
    goal.id = 'goal_' + Date.now();
    list.push(goal);
    localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('goalsUpdated'));
    return goal;
  }

  updateGoal(id, updatedGoal) {
    const list = this.getGoals();
    const idx = list.findIndex(g => g.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedGoal };
      localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('goalsUpdated'));
      return list[idx];
    }
    return null;
  }

  deleteGoal(id) {
    const list = this.getGoals().filter(g => g.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('goalsUpdated'));
  }

  // --- Backup & Restore (JSON) ---
  exportBackup() {
    const data = {
      app: 'YSK Family Finance',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      transactions: this.getTransactions(),
      budgets: this.getBudgets(),
      debts: this.getDebts(),
      goals: this.getGoals(),
      exchangeRate: window.i18n ? window.i18n.exchangeRate : 4100
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YSK_Family_Finance_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importBackup(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (data.transactions) localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
      if (data.budgets) localStorage.setItem(this.STORAGE_KEYS.BUDGETS, JSON.stringify(data.budgets));
      if (data.debts) localStorage.setItem(this.STORAGE_KEYS.DEBTS, JSON.stringify(data.debts));
      if (data.goals) localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(data.goals));
      if (data.exchangeRate && window.i18n) window.i18n.setExchangeRate(data.exchangeRate);

      window.dispatchEvent(new CustomEvent('dataImported'));
      return true;
    } catch (err) {
      console.error('Import error:', err);
      return false;
    }
  }

  // --- Export to CSV / Excel ---
  exportCSV() {
    const list = this.getTransactions();
    const isKm = window.i18n && window.i18n.getLanguage() === 'km';

    let csvContent = '\uFEFF'; // UTF-8 BOM for Khmer fonts in Excel
    csvContent += isKm 
      ? 'កាលបរិច្ឆេទ,ប្រភេទ,ជំពូក/ប្រភេទ,សមាជិក,ទូទាត់តាម,ចំនួនទឹកប្រាក់,រូបិយប័ណ្ណ,បរិយាយ/ចំណាំ\n'
      : 'Date,Type,Category,Member,PaymentMethod,Amount,Currency,Note\n';

    list.forEach(tx => {
      const row = [
        tx.date,
        window.i18n.t(tx.type === 'income' ? 'typeIncome' : 'typeExpense'),
        window.i18n.t(tx.category),
        window.i18n.t(tx.member),
        window.i18n.t(tx.payment),
        tx.amount,
        tx.currency,
        `"${(tx.note || '').replace(/"/g, '""')}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `YSK_Finance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Global storage singleton
window.storage = new StorageManager();
