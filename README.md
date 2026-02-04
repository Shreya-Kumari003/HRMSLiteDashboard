# HRMS Lite
 
**HRMS Lite** is a professional, enterprise-grade Human Resource Management System designed for efficient employee record management and daily attendance tracking. Built with a robust Django REST framework backend and a modern React frontend, it features a polished glass-morphism interface and comprehensive data visualization.
 
---
 
## 🚀 Quick Start
 
Get the application running in minutes.
 
### Prerequisites
- **Python** 3.8+
- **Node.js** 14+
- **Git**
 
### One-Click Setup (Windows)
We provide automated setup scripts to handle dependencies and database migrations.
 
1.  **Backend Setup**:
    ```powershell
    cd backend
    python setup.py
    ```
 
2.  **Frontend Setup**:
    ```powershell
    cd frontend
    node setup.js
    ```
 
3.  **Run Application**:
    Return to the root directory and run:
    ```powershell
    start.bat
    ```
    This launches both the backend API and frontend application.
 
> **Manual Setup**: For detailed manual installation instructions, please refer to [SETUP.md](SETUP.md).
 
---
 
## 🛠 Tech Stack
 
| Layer | Technology | Key Libraries |
| :--- | :--- | :--- |
| **Frontend** | React 18 | Axios, React Router, Notistack, Iconify |
| **Backend** | Django 4.2 | Django REST Framework, Django CORS Headers |
| **Database** | SQLite | Built-in (dev), extensible to PostgreSQL |
| **Styling** | CSS3 | Flexbox, Grid, Glassmorphism, Variables |
 
---
 
## ✨ Key Features
 
### 📊 Dashboard & Analytics
*   **Real-time Statistics**: Comprehensive overview of total employees and daily attendance status.
*   **Performance Metrics**: Visual analytics with color-coded indicators.
*   **Daily Summary**: Instant view of present vs. absent counts for the current day.
 
### 👥 Employee Management
*   **Complete CRUD**: Add, edit, and delete employee records with ease.
*   **Smart Validation**: Prevention of duplicate IDs and email validation.
*   **Rich Profiles**: Management of unique IDs, departments, and contact details.
*   **Visual Organization**: Department-specific color coding and avatar generation.
 
### 📅 Attendance System
*   **Intuitive Marking**: Visual status selection (Present, Absent, Leave) for daily records.
*   **Advanced Filtering**: Filter records by specific date ranges or individual employees.
*   **Status Indicators**: Clear, icon-based status markers for quick scanning.
*   **Duplicate Prevention**: Logic to ensure data integrity by preventing double entries.
*   **Performance Tracking**: Automated calculation of attendance percentages (Green: ≥80%, Yellow: 60-79%, Red: <60%).
 
---
 
## 🎨 User Interface & Experience
 
The application features a **production-ready, enterprise-grade interface** designed for usability and aesthetics.
 
### Visual Design
*   **Glass Morphism**: Modern translucent cards with backdrop blur effects.
*   **Gradient Systems**: Curated color transitions for a premium feel.
*   **Typography**: Professional font hierarchy ensuring readability.
*   **Consistent Iconography**: Unified icon system for universal recognition.
 
### Interactive Elements
*   **Feedback Loops**: Loading states, success/error toasts, and form validation messages.
*   **Micro-interactions**: Subtle hover effects and smooth transitions.
*   **Accessibility**: Focus states for keyboard navigation and reduced motion support.
*   **Responsive Layouts**: Fully optimized for desktop, tablet, and mobile devices.
 
---
 
## 🛡️ System Quality
 
Built with enterprise considerations for reliability and scale.
 
### Performance & Scalability
*   **Optimized Data Fetching**: Efficient API calls with proper caching strategies.
*   **Lazy Loading**: Components load on-demand to speed up initial render.
*   **Database Optimization**: Indexed queries for fast retrieval of attendance records.
 
### Security & Reliability
*   **Input Validation**: rigorous validation on both client and server sides.
*   **CORS Configuration**: Secure cross-origin resource sharing implementation.
*   **Error Handling**: Graceful error boundaries and meaningful user-facing error messages.
*   **Data Integrity**: Robust database constraints to maintain relational consistency.
 
---
 
## 📂 Project Structure
 
```text
hrms-lite/
├── backend/                # Django REST API
│   ├── manage.py           # Django entry point
│   ├── setup.py            # Automated setup script
│   ├── hrms_project/       # Core project settings
│   └── employees/          # App: Models, Views, Serializers
├── frontend/               # React Application
│   ├── package.json        # Dependencies
│   ├── setup.js            # Automated setup script
│   └── src/
│       ├── components/     # UI Components
│       ├── services/       # API Integration
│       └── App.js          # Root Component
├── SETUP.md                # Detailed configuration guide
└── start.bat               # Windows launcher
```
 
---
 
## 🔌 API Reference
 
The backend exposes a comprehensive REST API.
 
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/employees/` | List all employees |
| `POST` | `/api/employees/` | Create a new employee |
| `GET` | `/api/attendance/` | List attendance records |
| `POST` | `/api/attendance/` | Mark attendance |
| `GET` | `/api/dashboard/` | Get system summary stats |
 
*Full API documentation is available at `http://localhost:8000/api/` when the server is running.*
 
---
 
## 🤝 Contributing
 
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.
 
---
 
**HRMS Lite** — *Simple, Efficient, Professional.*