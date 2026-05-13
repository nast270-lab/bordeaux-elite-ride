@echo off
cd /d "C:\Users\nast2\OneDrive\Bureau\Cowork\bordeaux-elite-ride"
del /f ".git\index.lock" 2>nul
git add -A
git commit -m "secu headers + SEO complet + favicon + robots + sitemap + mentions legales"
git push origin claude/transport-whatsapp-booking-sIz3R
echo.
echo === TERMINE ===
pause
