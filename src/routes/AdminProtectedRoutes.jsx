import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const AdminProtectedRoute = () => {

  if (!Cookie.get("jwt") || Cookie.get("role") !== "admin") {
    return <Navigate to={"/admin_login"} />
  }
  return <Outlet />

};

export default AdminProtectedRoute;