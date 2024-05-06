import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const AuthRoutes = () => {
  const [token] = useState(Cookie.get("jwt"));

  if (token)
    return <Navigate to={Cookie.get("role") === "admin" ? "/admin_dashboard/users" : "/stories"} />

  return <Outlet />

};

export default AuthRoutes;