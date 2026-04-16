// src/modals/SignupModal.jsx

import React from "react";

export default function SignupModal({
  showSignupModal,
  setShowSignupModal,
  signupData,
  setSignupData,
  handleRegister,
  signupError,
  setShowLoginModal
}) {
  if (!showSignupModal) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowSignupModal(false)}
    >
      <div
        className="modal-container modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setShowSignupModal(false)}
        >
          ×
        </button>

        <div className="modal-header">
          <h2>Create Account</h2>
          <p>Join Le Méridien for exclusive benefits</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (handleRegister) {
              handleRegister(e);
            }
          }}
        >
  {signupError && (
            <div className="form-error">
              <span className="error-icon">⚠️</span>
              {signupError}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-phone">Phone Number</label>
              <input
                type="tel"
                id="signup-phone"
                value={signupData.phone}
                onChange={(e) =>
                  setSignupData({ ...signupData, phone: e.target.value })
                }
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email Address</label>
            <input
              type="email"
              id="signup-email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                placeholder="Min. 6 characters"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={signupData.acceptTerms}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    acceptTerms: e.target.checked,
                  })
                }
                required
              />
              <span>
                I agree to the <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="benefits-list">
            <p>Member benefits include:</p>
            <ul>
              <li>✓ Exclusive member rates</li>
              <li>✓ Early check-in / Late checkout</li>
              <li>✓ Loyalty points on every stay</li>
              <li>✓ Special birthday offers</li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Already have an account?
            <button
              className="link-btn"
              onClick={() => {
                setShowSignupModal(false);
                setShowLoginModal(true);
              }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}