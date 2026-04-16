import React from 'react';
import '../styles/global.css';
import { FaTimes } from 'react-icons/fa';

const ConfirmDialog = React.memo(({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        
        <div className="p-md">
          <p className="mb-md">{message}</p>
        </div>

        <div className="form-actions" style={{justifyContent: 'flex-end', gap: 'var(--space-sm)'}}>
          <button 
            className="btn btn-secondary" 
            type="button"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;

