import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { employeeAPI, attendanceAPI } from '../services/api';
import PageHeader from './PageHeader';
import Modal from './Modal';

function AttendanceManagement() {
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    employeeId: '',
    startDate: '',
    endDate: ''
  });
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
 
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(filters)
      ]);
 
      setEmployees(employeesRes.data);
      setAttendance(attendanceRes.data);
 
    } catch (err) {
      enqueueSnackbar('Failed to fetch data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [filters, enqueueSnackbar]);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await attendanceAPI.create(formData);
      enqueueSnackbar('Attendance marked successfully! 🎉', { variant: 'success' });
      setFormData({
        employee: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      setShowForm(false);
      fetchData();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.error || 'Failed to mark attendance', { variant: 'error' });
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getAll(filters);
      setAttendance(response.data);
      enqueueSnackbar('Filters applied successfully', { variant: 'info' });
    } catch (err) {
      enqueueSnackbar('Failed to filter attendance', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      employeeId: '',
      startDate: '',
      endDate: ''
    });
    fetchData();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSelectedEmployee = () => {
    return employees.find(emp => emp.id === parseInt(formData.employee));
  };

  if (loading) {
    return <div className="loading">Loading attendance data...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Attendance Management"
        subtitle="Mark and track employee attendance, view attendance records and history"
        icon="mdi:clipboard-text-clock"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <iconify-icon icon="mdi:clipboard-check"></iconify-icon>
            Mark Attendance
          </button>
        }
      />

      <div className="card">
        {/* Enhanced Filters Section */}
        <div className="filter-bar">

          {/* Row 1 — Heading */}
          <h4 className="filter-title">
            <iconify-icon icon="mdi:filter-variant"></iconify-icon>
            Filter Attendance Records
          </h4>

          {/* Row 2 — Controls */}
          <div className="filter-row">

            <div className="filter-inputs">
              <select
                name="employeeId"
                value={filters.employeeId}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">All Employees</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.employee_id}>
                    {employee.employee_id} - {employee.full_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="filter-input"
              />

              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>

            <div className="filter-actions">
              <button className="btn-apply" onClick={applyFilters}>
                <iconify-icon icon="mdi:filter-check"></iconify-icon>
                Apply Filters
              </button>

              <button className="btn-clear" onClick={clearFilters}>
                <iconify-icon icon="mdi:filter-off"></iconify-icon>
                Clear
              </button>
            </div>

          </div>
        </div>


        {attendance.length === 0 ? (
          <div className="empty-state">
            <iconify-icon icon="mdi:clipboard-search-outline" style={{ fontSize: '4rem', color: '#cbd5e0', marginBottom: '1rem' }}></iconify-icon>
            <h3>No Attendance Records Found</h3>
            <p>Start tracking attendance by marking the first record or adjust your filters</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <iconify-icon icon="mdi:clipboard-check-outline"></iconify-icon> Mark First Attendance
            </button>
          </div>
        ) : (
          <>
            <div className="record-count" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <iconify-icon icon="mdi:clipboard-list-outline" style={{ color: '#667eea' }}></iconify-icon>
              Showing {attendance.length} attendance record{attendance.length !== 1 ? 's' : ''}
              {(filters.employeeId || filters.startDate || filters.endDate) && (
                <span style={{ marginLeft: '0.5rem', fontStyle: 'italic' }}>
                  (filtered)
                </span>
              )}
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th><iconify-icon icon="mdi:identifier"></iconify-icon> ID</th>
                    <th><iconify-icon icon="mdi:account"></iconify-icon> Name</th>
                    <th><iconify-icon icon="mdi:calendar"></iconify-icon> Date</th>
                    <th><iconify-icon icon="mdi:list-status"></iconify-icon> Status</th>
                    <th><iconify-icon icon="mdi:clock-outline"></iconify-icon> Marked On</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <strong style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>
                          #{record.employee_id}
                        </strong>
                      </td>
                      <td>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: record.status === 'Present'
                              ? 'linear-gradient(135deg, #28a745, #20c997)'
                              : 'linear-gradient(135deg, #dc3545, #e74c3c)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem'
                          }}>
                            {record.employee_name.charAt(0).toUpperCase()}
                          </div>
                          {record.employee_name}
                        </div>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <iconify-icon icon="mdi:calendar-blank"></iconify-icon> {formatDate(record.date)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${record.status === 'Present' ? 'status-present' : 'status-absent'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <iconify-icon icon={record.status === 'Present' ? 'mdi:check-circle' : 'mdi:close-circle'}></iconify-icon> {record.status}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#6c757d', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <iconify-icon icon="mdi:clock-check-outline"></iconify-icon> {formatDate(record.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Mark Employee Attendance"
        icon="mdi:clipboard-edit-outline"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Employee</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Choose an employee...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.employee_id} - {employee.full_name} ({employee.department})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Attendance Status</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                border: '2px solid',
                borderRadius: '12px',
                borderColor: formData.status === 'Present' ? '#28a745' : '#e9ecef',
                backgroundColor: formData.status === 'Present' ? '#d4edda' : 'white',
                color: formData.status === 'Present' ? '#155724' : '#6c757d',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                flex: 1,
                justifyContent: 'center'
              }}>
                <input
                  type="radio"
                  name="status"
                  value="Present"
                  checked={formData.status === 'Present'}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                <iconify-icon icon="mdi:check-circle-outline"></iconify-icon> Present
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                border: '2px solid',
                borderRadius: '12px',
                borderColor: formData.status === 'Absent' ? '#dc3545' : '#e9ecef',
                backgroundColor: formData.status === 'Absent' ? '#f8d7da' : 'white',
                color: formData.status === 'Absent' ? '#721c24' : '#6c757d',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                flex: 1,
                justifyContent: 'center'
              }}>
                <input
                  type="radio"
                  name="status"
                  value="Absent"
                  checked={formData.status === 'Absent'}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                <iconify-icon icon="mdi:close-circle-outline"></iconify-icon> Absent
              </label>
            </div>
          </div>

          {getSelectedEmployee() && (
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              border: '1px solid #90caf9'
            }}>
              <strong>Selected Employee:</strong> {getSelectedEmployee().full_name}
              <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                ({getSelectedEmployee().department})
              </span>
            </div>
          )}

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <iconify-icon icon="mdi:check"></iconify-icon> Submit Attendance
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AttendanceManagement;