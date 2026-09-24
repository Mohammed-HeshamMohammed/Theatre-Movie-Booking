import React, { useState } from "react";
import "../css/auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Registeration() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const nav = useNavigate();

  function validForm() {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Please enter your username.";
    }
    if (!password) {
      nextErrors.password = "Please enter your password.";
    } else if (password.length < 10) {
      nextErrors.password = "Password must be at least 10 characters long.";
    }
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validForm()) return;
    setSubmitting(true);
    const result = await register({ name: name.trim(), email, password });
    setSubmitting(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    nav("/home");
  }

  return (
    <div className="auth-page">
      <div className="auth-card shadow-lg">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join to book seats and order snacks online.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="inputUser">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUser"
              value={name}
              placeholder="Username"
              autoComplete="username"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              placeholder="Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          {errors.form && <p className="field-error text-center">{errors.form}</p>}
          <button type="submit" className="btn btn-primary-accent w-100" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
          <div className="auth-switch">
            Already have an account?
            <NavLink className="auth-link" to="/">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
