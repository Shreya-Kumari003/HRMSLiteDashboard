@echo off
echo Starting HRMS Lite Application...

echo.
echo Starting Backend (Django)...
start "HRMS Backend" cmd /k "cd backend && python manage.py runserver"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend (React)...
start "HRMS Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause