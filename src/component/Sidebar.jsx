import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUtensils, FaCocktail, FaFilm, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useUI } from "../context/UIContext";
import "../css/Sidebar.css";

const LINKS = [
  { to: "/home", label: "Home", icon: FaHome, end: true },
  { to: "/home/food", label: "Foods' Court", icon: FaUtensils },
  { to: "/home/drink", label: "Drinks' Court", icon: FaCocktail },
  { to: "/home/reserveSeats", label: "Movies", icon: FaFilm },
];

function Sidebar() {
  const { mobileOpen, collapsed, closeMobileSidebar, toggleCollapsed } = useUI();

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobileSidebar} />}

      <aside
        className={`app-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}
      >
        <nav className="sidebar-links">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="sidebar-link"
              onClick={closeMobileSidebar}
              title={label}
            >
              <Icon className="sidebar-icon" />
              <span className="sidebar-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          className="sidebar-collapse-btn"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
