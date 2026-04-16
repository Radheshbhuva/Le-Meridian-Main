// src/modals/ForgotPasswordModal.jsx

import React from "react";

export default function ForgotPasswordModal({
  showForgotPassword,
  setShowForgotPassword,
  forgotEmail,
  setForgotEmail,
  handleForgotPassword,
  forgotError,
  resetSent,
  setResetSent,
  setShowLoginModal
}) {
  if (!showForgotPassword) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowForgotPassword(false)}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setShowForgotPassword(false)}
        >
          ×
        </button>

        <div className="modal-header">
          <h2>Reset Password</h2>
          <p>Enter your email to receive reset instructions</p>
        </div>

        {resetSent ? (
          <div className="reset-success">
            <div className="success-icon">✓</div>
            <h3>Check Your Email</h3>
            <p>
              We've sent password reset instructions to {forgotEmail}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setForgotEmail("");
              }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="modal-form">
            {forgotError && (
              <div className="form-error">
                <span className="error-icon">⚠️</span>
                {forgotError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="forgot-email">Email Address</label>
              <input
                type="email"
                id="forgot-email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="modal-footer">
          <button
            className="link-btn"
            onClick={() => {
              setShowForgotPassword(false);
              setShowLoginModal(true);
            }}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}