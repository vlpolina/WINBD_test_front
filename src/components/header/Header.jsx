import React from "react";
import "./header.scss";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6">Articles Editor</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
