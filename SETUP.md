# HRMS Lite Setup Guide

## Prerequisites

- Python 3.8+ with pip
- Node.js 16+ with npm
- Git (optional)

## Quick Start

### Option 1: Automated Setup (Windows)
```bash
# Run the batch file to start both servers
start.bat
```

### Option 2: Manual Setup

#### Backend Setup (Django)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver
```

#### Frontend Setup (React)
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/

## API Endpoints

### Employees
- `GET /api/employees/` - List all employees
- `POST /api/employees/` - Create new employee
- `DELETE /api/employees/{id}/` - Delete employee

### Attendance
- `GET /api/attendance/` - List attendance records
- `GET /api/attendance/?employee_id={id}` - Filter by employee
- `POST /api/attendance/` - Mark attendance

## Features

### Employee Management
- Add new employees with unique ID, name, email, and department
- View all employees in a table
- Delete employees with confirmation
- Form validation and error handling

### Attendance Management
- Mark daily attendance (Present/Absent)
- View attendance records for all employees
- Filter attendance by specific employee
- Prevent duplicate attendance for same date

## Troubleshooting

### Backend Issues
- **Port 8000 in use**: Change port in `python manage.py runserver 8001`
- **Database errors**: Delete `db.sqlite3` and run migrations again
- **CORS errors**: Check `CORS_ALLOWED_ORIGINS` in settings.py

### Frontend Issues
- **Port 3000 in use**: React will prompt to use different port
- **API connection**: Ensure backend is running on port 8000
- **Build errors**: Delete `node_modules` and run `npm install` again

## Development

### Adding New Features
1. Backend: Add models in `employees/models.py`
2. Create serializers in `employees/serializers.py`
3. Add views in `employees/views.py`
4. Update URLs in `employees/urls.py`
5. Frontend: Create components in `src/components/`
6. Add API calls in `src/services/api.js`

### Database Changes
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

### Backend
- Set `DEBUG = False` in settings.py
- Configure proper database (PostgreSQL/MySQL)
- Set up environment variables
- Use gunicorn or similar WSGI server

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with nginx or similar
```