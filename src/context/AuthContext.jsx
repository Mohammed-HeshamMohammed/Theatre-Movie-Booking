import React, { createContext, useContext, useMemo, useState } from "react";
import { hashPassword } from "../utils/crypto";

const USERS_KEY = "cinema_users";
const SESSION_KEY = "cinema_session";

const AuthContext = createContext(null);

function loadUsers() {
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  const register = async ({ name, email, password }) => {
    const users = loadUsers();
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const passwordHash = await hashPassword(password);
    users.push({ name, email: normalizedEmail, passwordHash });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { name, email: normalizedEmail };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const login = async ({ email, password }) => {
    const users = loadUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = await hashPassword(password);
    const match = users.find(
      (u) => u.email === normalizedEmail && u.passwordHash === passwordHash
    );
    if (!match) {
      return { ok: false, error: "Invalid email or password." };
    }
    const session = { name: match.name, email: match.email };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, register, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
