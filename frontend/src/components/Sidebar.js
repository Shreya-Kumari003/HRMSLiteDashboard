import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'mdi:view-dashboard' },
    { path: '/employees', label: 'Employees', icon: 'mdi:account-group' },
    { path: '/attendance', label: 'Attendance', icon: 'mdi:calendar-check' },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">HRMS</h2>
          <button className="toggle-btn" onClick={toggleSidebar} title="Toggle Sidebar">
            <span className="hamburger">
              <iconify-icon icon="mdi:menu-open"></iconify-icon>
            </span>
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={item.label}
            >
              <span className="nav-icon">
                <iconify-icon icon={item.icon}></iconify-icon>
              </span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <iconify-icon icon="mdi:account-circle"></iconify-icon>
            </div>
            <div className="user-details">
              <p className="user-name">Admin</p>
              <p className="user-role">Manager</p>
            </div>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button className="sidebar-toggle-floating" onClick={toggleSidebar}>
          <iconify-icon icon="mdi:menu"></iconify-icon>
        </button>
      )}
    </>
  );
}

export default Sidebar;
