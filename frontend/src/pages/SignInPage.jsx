// src/pages/SignInPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService";
import styles from "../styles/SignInPage.module.css";

function SignInPage({ setUser, setShowForgotPassword, setShowSignupModal }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (setUser) {
        setUser(res.data.user);
      }

      navigate("/");
    } catch (err) {
      console.log("Login error:", err.response);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signInPage}>
      <div className={styles.loginCard}>
        <h1>Sign In</h1>
        <p>Access your Le Méridien account</p>

        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className={styles.forgot}
            onClick={() => setShowForgotPassword && setShowForgotPassword(true)}
          >
            Forgot password?
          </button>

          <button type="submit" className={styles.signInBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            className={styles.createBtn}
            onClick={() =>
              setShowSignupModal && setShowSignupModal(true)
            }
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;