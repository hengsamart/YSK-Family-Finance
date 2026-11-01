@echo off
title YSK Family Finance - Push to GitHub
cd /d "%~dp0"

echo ========================================================
echo   YSK Family Finance - ភ្ជាប់ទៅកាន់ GitHub (Push to GitHub)
echo ========================================================
echo.

set "PATH=C:\Users\abc\AppData\Local\GitHubDesktop\app-3.6.7\resources\app\git\cmd;%PATH%"

:: Check if git remote already exists
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] រកឃើញ GitHub Remote រួចហើយ៖
    git remote -v
    echo.
    echo កំពុង Push កូដទៅ GitHub...
    git push -u origin main
    goto finished
)

echo សូមបើក https://github.com/new រួចបង្កើត Repository ថ្មីមួយ (ឈ្មោះ YSK-Family-Finance)។
echo បន្ទាប់មក សូមចម្លង (Copy) Link HTTPS របស់ GitHub Repository នោះមកបិទភ្ជាប់ (Paste) នៅត្រង់នេះ៖
echo (ឧទាហរណ៍៖ https://github.com/your-username/YSK-Family-Finance.git)
echo.
set /p REPO_URL="បញ្ចូល Link GitHub Repository ទីនេះ: "

if "%REPO_URL%"=="" (
    echo [!] មិនបានបញ្ចូល Link ទេ។ សូមសាកល្បងម្ដងទៀត។
    pause
    exit /b
)

echo.
echo [*] កំពុងភ្ជាប់ Remote origin ទៅកាន់: %REPO_URL%
git remote add origin %REPO_URL%

echo [*] កំពុងរៀបចំ Branch main...
git branch -M main

echo [*] កំពុង Push កូដឡើងទៅ GitHub...
git push -u origin main

:finished
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  [✓] ជោគជ័យ! កូដទាំងអស់បានឡើងទៅកាន់ GitHub រួចរាល់ហើយ!
    echo ========================================================
    echo.
    echo ជំហានបន្ទាប់ (Step 2):
    echo 1. ចូលទៅកាន់ GitHub Repo របស់អ្នក
    echo 2. ចុច Settings -> Pages
    echo 3. ត្រង់ Source ជ្រើសរើសយក "GitHub Actions"
    echo.
) else (
    echo.
    echo [!] ប្រសិនបើមានបញ្ហា Login ឬ Permission សូមប្រាកដថាអ្នកបាន Sign In GitHub លើ Browser ឬ GitHub Desktop។
)

echo.
pause
