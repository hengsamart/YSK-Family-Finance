"""
YSK Family Finance - Native Desktop App Launcher
Runs a native desktop window using pywebview and a local lightweight HTTP server.
"""

import os
import sys
import threading
import http.server
import socketserver
import webbrowser

PORT = 8088
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Suppress routine GET logs for clean console
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler) as httpd:
            print(f"[YSK Finance] Local server running on http://127.0.0.1:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"[YSK Finance] Server notice: {e}")

def main():
    # Start local HTTP server in background thread
    t = threading.Thread(target=start_server, daemon=True)
    t.start()

    url = f"http://127.0.0.1:{PORT}/index.html"

    # Try pywebview for genuine native Windows application window
    try:
        import webview
        print("[YSK Finance] Launching native window via pywebview...")
        window = webview.create_window(
            title="YSK Family Finance - ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុគ្រួសារឆ្លាតវៃ",
            url=url,
            width=1280,
            height=850,
            min_size=(800, 600),
            background_color='#0f172a'
        )
        webview.start()
    except Exception as e:
        print(f"[YSK Finance] Native window fallback to browser: {e}")
        webbrowser.open(url)
        # Keep process alive
        try:
            import time
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("[YSK Finance] Exiting...")

if __name__ == '__main__':
    main()
