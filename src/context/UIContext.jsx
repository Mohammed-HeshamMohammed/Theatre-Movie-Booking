import React, { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openMobileSidebar = () => setMobileOpen(true);
  const closeMobileSidebar = () => setMobileOpen(false);
  const toggleMobileSidebar = () => setMobileOpen((open) => !open);
  const toggleCollapsed = () => setCollapsed((value) => !value);

  const value = {
    mobileOpen,
    collapsed,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
    toggleCollapsed,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
