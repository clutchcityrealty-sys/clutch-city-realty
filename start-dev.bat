@echo off
echo ===================================================
echo   Starting Clutch City Realty Development Stack
echo ===================================================

:: 1. Ensure Ollama and Qwen 2.5 14B are warmed up
echo [1/3] Checking Local AI (Qwen 2.5 14B)...
start "Ollama AI" cmd /k "ollama run qwen2.5:14b"

:: 2. Launch Python FastAPI Backend on Port 8000
echo [2/3] Starting Python FastAPI Server...
start "Python Backend" cmd /k "cd /d C:\ClutchCItyRealty\clutch-city-realty\backend && python -m uvicorn main:app --reload"

:: 3. Launch React Vite Frontend
echo [3/3] Starting React Frontend...
start "React Frontend" cmd /k "cd /d C:\ClutchCItyRealty\clutch-city-realty && npm run dev"

:: Wait 4 seconds for Vite to spin up, then open the browser
timeout /t 4 /nobreak >nul
start http://localhost:5173

echo All servers launched! You can close this launcher window.