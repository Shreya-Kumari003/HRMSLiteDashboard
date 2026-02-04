import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/employees/'),
  create: (data) => api.post('/employees/', data),
  delete: (id) => api.delete(`/employees/${id}/`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (filters = {}) => {
    const params = {};
    if (filters.employeeId) params.employee_id = filters.employeeId;
    if (filters.startDate) params.start_date = filters.startDate;
    if (filters.endDate) params.end_date = filters.endDate;
    return api.get('/attendance/', { params });
  },
  create: (data) => api.post('/attendance/', data),
};

// Dashboard API
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/'),
};

export default api;