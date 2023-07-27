import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/pages/_auth.scss";
import "../../styles/form.scss";
import axios from "axios";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();

    const loginData = { username, password };
    if (username === "" || password === "") {
      toast.warn("Please fill the empty field");
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login`, loginData)
        .then((res) => {
          toast.success("Login succesfully!");
          localStorage.setItem("Connected User", JSON.stringify(res.data.user));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 404) {
              toast.error("User not found!");
            } else if (status === 401) {
              toast.error("Incorrect password.");
            } else {
              toast.error(
                "Failed to log in. Please check your username and password and try again"
              );
            }
          } else {
            toast.error(
              "Failed to log in. Please check your username and password and try again"
            );
          }
        });
    }
  }

  return (
    <div className="auth-wrapper wrapper">
      <h2 className="title">Login</h2>
      <form className="form" onSubmit={handleLoginSubmit}>
        <label htmlFor="login-name">Username</label>
        <input
          type="text"
          id="login-name"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">Login</button>
      </form>

      <small className="auth-wrapper-text">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </small>
    </div>
  );
}
