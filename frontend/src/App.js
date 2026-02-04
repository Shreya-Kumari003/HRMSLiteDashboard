import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import AttendanceManagement from './components/AttendanceManagement';

function App() {
  return (
    <Router>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/attendance" element={<AttendanceManagement />} />
          </Routes>
        </MainLayout>
      </SnackbarProvider>
    </Router>
  );
}

export default App;