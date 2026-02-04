import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, icon }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="custom-modal-header">
                    <div className="custom-modal-title-wrapper">
                        {icon && <iconify-icon icon={icon} className="custom-modal-header-icon"></iconify-icon>}
                        <h3 className="custom-modal-title">{title}</h3>
                    </div>
                    <button className="custom-modal-close-btn" onClick={onClose}>
                        <iconify-icon icon="mdi:close"></iconify-icon>
                    </button>
                </div>
                <div className="custom-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
