import React from "react";
import { Outlet } from "react-router-dom";
import "./css/App.css";
import Home from "./component/Home";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="App">
      <Home />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
