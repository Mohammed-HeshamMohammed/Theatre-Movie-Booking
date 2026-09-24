import React, { useState } from "react";
import "../css/auth.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function formValidation() {
    const nextErrors = {};
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      nextErrors.password = "Please enter your password.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!formValidation()) return;
    setSubmitting(true);
    const result = await login({ email, password });
    setSubmitting(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    navigate("/home");
  }

  return (
    <div className="auth-page">
      <div className="auth-card shadow-lg">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to keep watching and booking.</p>
        </div>
        <form className="auth-form" onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>
          {errors.form && <p className="field-error text-center">{errors.form}</p>}
          <button type="submit" className="btn btn-primary-accent w-100" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </button>
          <div className="auth-switch">
            Don't have an account yet?
            <NavLink className="auth-link" to="/Registeration">
              Register here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
