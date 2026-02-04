import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import PageHeader from './PageHeader';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getSummary();
      setDashboardData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getAttendancePercentageClass = (percentage) => {
    if (percentage >= 80) return 'percentage-excellent';
    if (percentage >= 60) return 'percentage-good';
    return 'percentage-poor';
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="error">No dashboard data available</div>;
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="View overall system statistics and performance metrics"
        icon="lucide:layout-dashboard"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="page-header-date" style={{ borderRight: '1px solid rgba(0,0,0,0.1)', paddingRight: '1rem', marginRight: '0.5rem' }}>
              <span className="page-header-date-label">Today</span>
              <span className="page-header-date-value">
                {new Date(dashboardData.today_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = '/employees'}
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <iconify-icon icon="mdi:account-group"></iconify-icon> Employees
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = '/attendance'}
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <iconify-icon icon="mdi:clipboard-check"></iconify-icon> Attendance
            </button>

            <button
              className="btn btn-primary"
              onClick={fetchDashboardData}
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <iconify-icon icon="mdi:refresh"></iconify-icon> Refresh
            </button>
          </div>
        }
      />

      {/* Summary Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--primary)' }}>
            <iconify-icon icon="mdi:account-group"></iconify-icon>
          </div>
          <div className="stat-content">
            <div className="stat-number">{dashboardData.total_employees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <iconify-icon icon="mdi:account-check"></iconify-icon>
          </div>
          <div className="stat-content">
            <div className="stat-number">{dashboardData.today_present}</div>
            <div className="stat-label">Present Today</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <iconify-icon icon="mdi:account-remove"></iconify-icon>
          </div>
          <div className="stat-content">
            <div className="stat-number">{dashboardData.today_absent}</div>
            <div className="stat-label">Absent Today</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <iconify-icon icon="mdi:clipboard-text-clock"></iconify-icon>
          </div>
          <div className="stat-content">
            <div className="stat-number">{dashboardData.total_attendance_records}</div>
            <div className="stat-label">Total Records</div>
          </div>
        </div>
      </div>

      {/* Employee Attendance Statistics */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <iconify-icon icon="mdi:chart-timeline-variant" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></iconify-icon>
            Employee Performance Analytics
          </h3>
        </div>

        {dashboardData.employee_stats.length === 0 ? (
          <div className="empty-state">
            <iconify-icon icon="mdi:chart-bar-off" style={{ fontSize: '4rem', color: 'var(--text-secondary)', opacity: 0.2, marginBottom: '1rem' }}></iconify-icon>
            <h3>No Performance Data</h3>
            <p>Start marking attendance to see analytics</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Present Days</th>
                  <th>Total Days</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.employee_stats.map((employee, index) => (
                  <tr key={employee.employee_id}>
                    <td style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>
                      #{employee.employee_id}
                    </td>
                    <td style={{ fontWeight: '600' }}>{employee.full_name}</td>
                    <td>
                      <span style={{
                        padding: '0.4rem 0.8rem',
                        backgroundColor: 'rgba(20, 184, 166, 0.08)',
                        color: 'var(--primary-dark)',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {employee.department}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{employee.present_days}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.2rem' }}>days</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{employee.total_days}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.2rem' }}>days</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className={`attendance-percentage ${getAttendancePercentageClass(employee.attendance_percentage)}`}>
                          {employee.attendance_percentage}%
                        </span>
                        {index === 0 && employee.attendance_percentage > 0 && (
                          <iconify-icon icon="mdi:crown" style={{ color: '#fbbf24', fontSize: '1.5rem' }} title="Top Performer"></iconify-icon>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;