import React, { useEffect } from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger' // danger, warning, info
}) => {

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className={`modal-icon ${type}`}>
                        <iconify-icon icon={
                            type === 'danger' ? 'mdi:alert-circle' :
                                type === 'warning' ? 'mdi:alert' : 'mdi:information'
                        }></iconify-icon>
                    </div>
                    <h3 className="modal-title">{title}</h3>
                </div>

                <div className="modal-content">
                    <p>{message}</p>
                </div>

                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button
                        className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
