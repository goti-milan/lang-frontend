import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "../utils/axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("/users/logout")
      .then(() => navigate("/login"))
      .catch((err) => navigate("/error"));
  };

  const theme = createTheme({

  });

  return (
    <div className='header'>
      <ThemeProvider theme={theme}>
        <AppBar sx={{ backgroundColor: '#603CEE' }} position="static">
          <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', marginLeft: '16px' }}>
              <img src={process.env.REACT_APP_PUBLIC_URL + '/logo.png'} className='icon-logo' />
              <NavLink className={"writer-nav-link"} to="/stories">Translation Stories</NavLink>
              <NavLink className={"writer-nav-link"} to="/master-stories">Master Stories</NavLink>
            </Box>
            <Link sx={{ color: 'white', marginRight: '32px', marginLeft: 'auto', fontSize: { sm: "16px", xs: "14px" } }} onClick={logout}>Logout</Link>
          </Box>
        </AppBar>
      </ThemeProvider>
    </div>
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

export default Header;
