@echo off
cd /d "%~dp0"
echo === Suppression verrou ===
if exist ".git\index.lock" del /f ".git\index.lock" && echo Lock supprime
timeout /t 1 /nobreak >nul
echo === Fetch ===
git fetch origin
echo === Rebase ===
git rebase origin/claude/transport-whatsapp-booking-sIz3R
echo === Push ===
git push origin claude/transport-whatsapp-booking-sIz3R
echo === DONE %ERRORLEVEL% ===
pause
