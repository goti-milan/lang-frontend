import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import { Box } from "@mui/material";
import Header from "components/Header";

const AdminProtectedRoute = () => {

  if (!Cookie.get("jwt") || Cookie.get("role") !== "writer") {
    return <Navigate to={"/login"} />
  }
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  )

};

export default AdminProtectedRoute;