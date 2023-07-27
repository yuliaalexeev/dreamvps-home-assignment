import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Pages/Home/Home";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import Edit from "./Pages/Edit/Edit";

const PrivateRoute = () => {
  const isAuthenticated = !!JSON.parse(localStorage.getItem("Connected User"));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/" element={<PrivateRoute isAdmin={true} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
