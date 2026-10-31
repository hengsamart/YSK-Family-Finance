@echo off
title YSK Family Finance - Local Server (PC & Mobile LAN)
cd /d "%~dp0"

echo ========================================================
echo   YSK Family Finance - Local Server (Computer & Mobile)
echo   ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុគ្រួសារឆ្លាតវៃ
echo ========================================================
echo.

python -c "
import socket
import http.server
import socketserver
import webbrowser
import os

PORT = 8080

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

ip = get_ip()
print(f'[*] កុំព្យូទ័រនេះ (This PC):     http://localhost:{PORT}/index.html')
print(f'[*] ទូរស័ព្ទដៃ (Mobile Phone on same Wi-Fi): http://{ip}:{PORT}/index.html')
print('')
print('ចុច Ctrl+C ដើម្បីបិទ Server (Press Ctrl+C to stop)')

webbrowser.open(f'http://localhost:{PORT}/index.html')

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('0.0.0.0', PORT), QuietHandler) as httpd:
    httpd.serve_forever()
"

pause
