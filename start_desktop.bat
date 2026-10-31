@echo off
title YSK Family Finance - Desktop App
cd /d "%~dp0"

echo ========================================================
echo   YSK Family Finance - Desktop Application
echo   ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុគ្រួសារឆ្លាតវៃ
echo ========================================================
echo.
echo Launching YSK Family Finance...

python desktop_launcher.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Could not start with python. Opening directly in default browser...
    start "" "%~dp0index.html"
)

pause
