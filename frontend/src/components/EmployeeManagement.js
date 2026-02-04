import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { employeeAPI } from '../services/api';
import PageHeader from './PageHeader';
import ConfirmationModal from './ConfirmationModal';
import Modal from './Modal';

function EmployeeManagement() {
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employeeId: null,
    employeeName: ''
  });

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
 
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
 
    } catch (err) {
      enqueueSnackbar('Failed to fetch employees', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);
 
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeAPI.create(formData);
      enqueueSnackbar('Employee added successfully! 🎉', { variant: 'success' });
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.error || 'Failed to add employee', { variant: 'error' });
    }
  };

  const initiateDelete = (id, name) => {
    setDeleteModal({
      isOpen: true,
      employeeId: id,
      employeeName: name
    });
  };

  const confirmDelete = async () => {
    try {
      await employeeAPI.delete(deleteModal.employeeId);
      enqueueSnackbar('Employee deleted successfully! ✅', { variant: 'success' });
      fetchEmployees();
    } catch (err) {
      enqueueSnackbar('Failed to delete employee', { variant: 'error' });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'HR': '#e3f2fd',
      'IT': '#f3e5f5',
      'Finance': '#e8f5e8',
      'Marketing': '#fff3e0',
      'Operations': '#fce4ec',
      'Sales': '#e0f2f1'
    };
    return colors[department] || '#f5f5f5';
  };

  const getDepartmentTextColor = (department) => {
    const colors = {
      'HR': '#1565c0',
      'IT': '#7b1fa2',
      'Finance': '#2e7d32',
      'Marketing': '#e65100',
      'Operations': '#c2185b',
      'Sales': '#00695c'
    };
    return colors[department] || '#666';
  };

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle="Manage your workforce, track roles, and oversee team departments"
        icon="mdi:account-group"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <iconify-icon icon="mdi:account-plus"></iconify-icon>
            Add Employee
          </button>
        }
      />

      <div className="card">



        {employees.length === 0 ? (
          <div className="empty-state">
            <iconify-icon icon="mdi:account-search-outline" style={{ fontSize: '4rem', color: '#cbd5e0', marginBottom: '1rem' }}></iconify-icon>
            <h3>No Employees Found</h3>
            <p>Start building your team by adding the first employee</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <iconify-icon icon="mdi:account-plus"></iconify-icon> Add First Employee
            </button>
          </div>
        ) : (
          <>
            <div className="record-count" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <iconify-icon icon="mdi:account-multiple-check" style={{ color: '#667eea' }}></iconify-icon>
              Total Employees: {employees.length}
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th><iconify-icon icon="mdi:identifier"></iconify-icon> ID</th>
                    <th><iconify-icon icon="mdi:account"></iconify-icon> Full Name</th>
                    <th><iconify-icon icon="mdi:email"></iconify-icon> Email</th>
                    <th><iconify-icon icon="mdi:office-building"></iconify-icon> Dept</th>
                    <th><iconify-icon icon="mdi:calendar"></iconify-icon> Joined</th>
                    <th><iconify-icon icon="mdi:cog"></iconify-icon> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <strong style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>
                          #{employee.employee_id}
                        </strong>
                      </td>
                      <td>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #5a607aff, #3a3143ff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.875rem'
                          }}>
                            {employee.full_name.charAt(0).toUpperCase()}
                          </div>
                          {employee.full_name}
                        </div>
                      </td>
                      <td>
                        <a
                          href={`mailto:${employee.email}`}
                          style={{
                            color: '#667eea',
                            textDecoration: 'none'
                          }}
                        >
                          {employee.email}
                        </a>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: getDepartmentColor(employee.department),
                          color: getDepartmentTextColor(employee.department),
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: `1px solid ${getDepartmentTextColor(employee.department)}20`
                        }}>
                          {employee.department}
                        </span>
                      </td>
                      <td>
                        {new Date(employee.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => initiateDelete(employee.id, employee.full_name)}
                          style={{
                            fontSize: '0.875rem',
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            borderRadius: '8px'
                          }}
                        >
                          <iconify-icon icon="mdi:delete-outline"></iconify-icon> Delete
                        </button>
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
        title="Add New Employee"
        icon="mdi:account-plus"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g., EMP001"
                required
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g., John Doe"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g., john.doe@company.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <iconify-icon icon="mdi:check"></iconify-icon> Register Employee
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deleteModal.employeeName}? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Employee"
        cancelText="Cancel"
      />
    </div>
  );
}

export default EmployeeManagement;