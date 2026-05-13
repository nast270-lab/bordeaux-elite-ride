@echo off
cd /d "C:\Users\nast2\OneDrive\Bureau\Cowork\bordeaux-elite-ride"

echo === Suppression index.lock ===
del /f ".git\index.lock" 2>nul

echo === Abandon du merge en cours ===
git merge --abort 2>nul

echo === Ajout de tous les fichiers modifies ===
git add -A

echo === Commit ===
git commit -m "photos sombres sans marque + suppression map"

echo === Push ===
git push origin claude/transport-whatsapp-booking-sIz3R

echo === TERMINE ===
pause
