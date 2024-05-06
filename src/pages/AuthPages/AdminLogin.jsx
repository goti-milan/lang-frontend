import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { NotifyContext } from "../../context/NotifyContext"


const theme = createTheme();

export default function AdminLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useContext(NotifyContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    axios
      .post("/users/admin_login", data)
      .then((res) => {
        Cookies.set("jwt", res.data.token)
        Cookies.set("role", res.data.role)
        navigate("/admin_dashboard/users");

      }).catch((err) => {
        setError(err?.response?.data?.message)
        toast({ message: "Incorrect username or password", type: "error" })
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            {error && (
              <Typography component="p" color="red">
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
