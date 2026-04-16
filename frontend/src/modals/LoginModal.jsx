// src/modals/LoginModal.jsx

import React from "react";

export default function LoginModal({
  showLoginModal,
  setShowLoginModal,
  loginData,
  setLoginData,
  handleLogin,
  loginError,
  setShowSignupModal,
  setShowForgotPassword,
}) {
  if (!showLoginModal) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowLoginModal(false)}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setShowLoginModal(false)}
        >
          ×
        </button>

        <div className="modal-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Le Méridien account</p>
        </div>

        {/* ✅ IMPORTANT: handleLogin receives event */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleLogin(e);     // call parent function
          }}
          className="modal-form"
        >
          {loginError && (
            <div className="form-error">
              <span className="error-icon">⚠️</span>
              {loginError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              type="email"
              id="login-email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={loginData.rememberMe}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    rememberMe: e.target.checked,
                  })
                }
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-link"
              onClick={() => {
                setShowLoginModal(false);
                setShowForgotPassword(true);
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Don't have an account?
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setShowLoginModal(false);
                setShowSignupModal(true);
              }}
            >
              Sign up
            </button>
          </p>

          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}