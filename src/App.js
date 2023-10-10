import React from "react";
import { Outlet } from "react-router-dom";
import "./css/App.css";
import Home from "./component/Home";
import Footer from "./component/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div className="App"> 
      <Home />
      <Outlet/>
      <Footer />
      
    </div>
  );
}

export default App;
