import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { registerRoute } from "../utils/api.js";

function Register() {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    conformpassword: "",
  });

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidation()) {
      const { email, username, password } = value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.user)
        );
      }
      navigate("/chat");
    }
  };

  const handelValidation = () => {
    const { password, conformpassword, username, email } = value;
    if (password !== conformpassword) {
      alert("Password and confirm password should be the same.");
      return false;
    }
     else if (email === "") {
      alert("Email is required.");
      return false;
    }
    return true;
  };

  const handelChange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={(event) => handelSubmit(event)} className="form">
          <div className="brand">
            <h1>Chat App</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="conformpassword"
            onChange={(e) => handelChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account? <Link to="/">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Register;
