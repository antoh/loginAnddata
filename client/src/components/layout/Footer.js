import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" to="/">
          Turbulence Web App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default Footer;
