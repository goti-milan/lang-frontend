import React from "react";
import { Link } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("/users/logout")
      .then(() => navigate("/admin_login"))
      .catch((err) => navigate("/error"));
  };

  return (
    <Container>
      <Link onClick={logout}>Logout</Link>
    </Container>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: "2rem 5%",
  alignItems: "center",
});

export default AdminHeader;
