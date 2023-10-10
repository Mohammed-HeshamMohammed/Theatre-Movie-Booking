import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login() {
  const [email, setemail] = useState(``);
  const [password, setpass] = useState(``);
  const [errors, seterrors] = useState({});
  const navigate = useNavigate();
  const Data = JSON.parse(localStorage.getItem("Data"));

  function formValidation() {
    let isValid = true;
    const errors = {};

    if (!email || email !== Data[0].email) {
      isValid = false;
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Please enter a valid email address.";
    }
    if (!password || password !== Data[0].password) {
      isValid = false;
      errors.password = "please enter your password";
    } else if (password.length < 10) {
      isValid = false;
      errors.password = "Password must be at least 10 characters long.";
    }
    seterrors(errors);
    if (isValid) {
      setemail("");
      setpass("");
    }
    return isValid;
  }
  function handleLogin(e) {
    e.preventDefault();
    if (formValidation()) {
      navigate("/home");
    }
  }
  return (
    <div className="login container  shadow-lg">
      <div className="image w-100 position-relative">
        <h2 className="position-absolute fs-1 text-black">Login</h2>
      </div>
      <form action="/home" className="form mt-5 p-2" onSubmit={handleLogin}>
        <div className="form-group">
          <label className=" text-danger">Email</label>
          <input
            type="email"
            value={email || ``}
            className="form-control"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
          />
          <p className="text-danger">{errors.email}</p>
        </div>
        <div className="form-group">
          <label className="mt-5 p-2 text-danger">Password</label>
          <input
            type="password"
            value={password || ``}
            className="form-control"
            placeholder="Password"
            onChange={(e) => setpass(e.target.value)}
          />
        </div>
        <p className="text-danger">{errors.password}</p>
        <button type="submit" className="btn btn-dark mt-5 w-100">
          Login
        </button>
        <div className="text-center text-white mt-3">
          Don't have  an account Yet?!!
          <NavLink className="m-2" to="/Registeration" >/-Register Here-/</NavLink>
          </div>
      </form>
    </div>
  );
}

export default Login;
