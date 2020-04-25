import React from "react";

import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" style={{color: "#D3D3D3"}} align="center">
      {"Copyright © "}
      <Link to="/" color="inherit" style={{ textDecoration: "none", color: "#D3D3D3" }}>
        Corona Bay
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
