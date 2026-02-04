import React from 'react';
import './PageHeader.css';

function PageHeader({ title, subtitle, actions, icon }) {
  return (
    <div className="page-header">
      <div className="page-header-left">
        <div className="page-title-container">
          {icon && <iconify-icon icon={icon} class="page-header-icon"></iconify-icon>}
          <h1 className="page-title">{title}</h1>
        </div>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="page-header-right">
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
