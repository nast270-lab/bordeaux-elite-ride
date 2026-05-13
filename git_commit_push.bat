@echo off
cd /d "%~dp0"
echo === Suppression du verrou git ===
if exist ".git\index.lock" del /f ".git\index.lock" && echo Lock supprime || echo Pas de lock
echo.
echo === Git add ===
git add public/css/style.css public/about.html
echo.
echo === Git commit ===
git commit -m "remplace photos vehicules par SUV sans marque (Pexels CDN)"
echo.
echo === Git pull rebase ===
git pull --rebase
echo.
echo === Git push ===
git push origin claude/transport-whatsapp-booking-sIz3R
echo.
echo === TERMINE ===
pause
