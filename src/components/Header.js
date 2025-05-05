import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

