import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../register/register.css";
import axios from "axios";
import { loginRoute } from "../utils/api.js"

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]); // Added navigate as a dependency

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "" || username === "") { // Fixed condition for username
        alert("Username and Password are required")
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => { // Renamed handelSubmit to handleSubmit
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;
      try {
        const { data, status } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (status === 200 && data.status === false) { // Added status check
            alert(data.msg)
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data));
          navigate("/");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (event) => { // Renamed handelChange to handleChange
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="brand">
            <h1>Chat App</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login User</button>

          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;