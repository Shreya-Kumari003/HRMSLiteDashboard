import React from 'react';
import Sidebar from './Sidebar';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
