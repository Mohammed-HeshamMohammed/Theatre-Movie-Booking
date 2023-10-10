import React, { useState } from "react";
import "../images/logoRegister.jpg";
import "../css/register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Registeration() {
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("Data"));
    if (savedData) {
      setname(savedData.name);
      setpassword(savedData.password);
      setemail(savedData.email);
    }
  }, []);

  function validForm() {
    let isvalid = true;
    let errors = {};
    if (!name) {
      isvalid = false;
      errors.name = "Please enter your username.";
    }
    if (!password) {
      isvalid = false;
      errors.password = "Please enter your password.";
    } else if (password.length <= 10) {
      isvalid = false;
      errors.password = "Password must be at least 10 characters long.";
    }
    if (!email) {
      isvalid = false;
      errors.email = "please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isvalid = false;
      errors.email = "Please enter a valid email address.";
    }

    setErrors(errors);

    if (isvalid) {
      setname("");
      setpassword("");
      setemail("");
    }
    return isvalid;
  }
  function handlesubmit(e) {
    e.preventDefault();
    if (validForm()) {
      alert("Form submitted successfully!");
      nav("/")
    }
    let FormData = { name, password, email };
   
    
    localStorage.setItem("Data", JSON.stringify(FormData));
    console.log(JSON.parse(localStorage.getItem("Data")));
    let arrayData = [];
    console.log(arrayData);
    arrayData.push(JSON.parse(localStorage.getItem("Data")));
    console.log(arrayData);
    localStorage.setItem("Data", JSON.stringify(arrayData));
  }
  
  return (
    <div className="register container  w-50 p-0 mt-5 shadow-lg">
      <div className="image position-relative">
        <h2 className="position-absolute text-dark fs-1">Register</h2>
      </div>
      <div className="form mt-4 p-3 mb-3">
        <form method="get" onSubmit={handlesubmit}>
          <div className="row">
            <div className="form-group ">
              <label className="mb-2 text-danger" htmlFor="inputEmail4">
                UserName
              </label>
              <input
                type="text"
                className="form-control"
                id="inputuser4"
                value={name || ``}
                placeholder="username"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="text-danger error">{errors.name}</div>
            <div className="form-group ">
              <label className="mb-3 text-danger" htmlFor="inputPassword4">
                <br></br><br></br>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password || ``}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="text-danger error">{errors.password}</div>
            <div className="form-group ">
              <label className="mt-5   text-danger" htmlFor="inputEmail4">
                Email
              </label>
              <input
                type="email"
                className="form-control "
                id="inputEmail4"
                value={email || ``}
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="text-danger error">{errors.email}</div>
          </div>
          <button type="submit" className="btn btn-dark mt-4 w-100">
            Register
          </button>
          <div className="text-center text-white mt-2">
          Already have  an account !  
          <NavLink className="m-2" to="/" >Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
