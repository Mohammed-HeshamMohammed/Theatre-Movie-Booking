import React from "react";
import { Outlet } from "react-router-dom";
import "./css/App.css";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Sidebar from "./component/Sidebar";
import { useUI } from "./context/UIContext";

function App() {
  const { collapsed } = useUI();

  return (
    <div className={`app-shell${collapsed ? " collapsed" : ""}`}>
      <Sidebar />
      <div className="app-main">
        <Home />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
