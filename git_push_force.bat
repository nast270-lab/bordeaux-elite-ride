@echo off
cd /d "%~dp0"
echo === Fermeture GitHub Desktop ===
taskkill /im githubdesktop.exe /f 2>nul && echo GitHub Desktop ferme || echo Pas de GitHub Desktop
taskkill /im git-credential-manager.exe /f 2>nul
timeout /t 2 /nobreak >nul

echo === Suppression du verrou git ===
if exist ".git\index.lock" del /f ".git\index.lock" && echo Lock supprime || echo Pas de lock
echo.
echo === Git status ===
git status --short
echo.
echo === Git push ===
git push origin claude/transport-whatsapp-booking-sIz3R
echo.
echo === RESULTAT: %ERRORLEVEL% ===
pause
