@echo off
title YSK Family Finance - GitHub Auto Update
cd /d "%~dp0"

echo ========================================================
echo   YSK Family Finance - GitHub Auto Update
echo   ប្រព័ន្ធធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិតាមរយៈ GitHub
echo ========================================================
echo.

python updater.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Trying direct Git pull...
    set "PATH=C:\Users\abc\AppData\Local\GitHubDesktop\app-3.6.7\resources\app\git\cmd;%PATH%"
    git pull origin main
    pause
)
