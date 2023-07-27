import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/form.scss";
import "../../styles/pages/_auth.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = {
      username,
      password,
      repeatPassword,
    };
    if (username === "" || password === "" || repeatPassword === "") {
      toast.warn("Please fill the rest fields...");
    } else if (password !== repeatPassword) {
      toast.warn("The password and repeatPassword didn't match");
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, registrationData)
        .then((res) => {
          const { message } = res.data;
          toast.success(`${message} \nRedirecting you to the login page...`);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <div className="auth-wrapper wrapper">
      <h2 className="title">Registration</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        ></input>

        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <small className="auth-wrapper-text">
        Have an account? <Link to="/login">Login</Link>
      </small>
    </div>
  );
}
