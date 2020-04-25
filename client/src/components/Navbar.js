import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const unauthenticatedNavbar = (classes) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Corona Bay
            </Link>
            <Link
              to="/about"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                marginLeft: "1%",
              }}
            >
              <Button color="inherit">About</Button>
            </Link>
            <Link
              to="/statistics"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                marginLeft: "1%",
              }}
            >
              <Button color="inherit">Statistics</Button>
            </Link>
            <Link
              to="/news"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                marginLeft: "1%",
              }}
            >
              <Button color="inherit">News</Button>
            </Link>
          </Typography>
          <Link
            to="/register"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button color="inherit">Register</Button>
          </Link>
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const Navbar = (props) => {
  const [authenticated, setAuthenticated] = useState();
  const classes = useStyles();

  useEffect(() => {
    setAuthenticated(props.auth.isAuthenticated);
  }, [props.auth.isAuthenticated]);

  if (authenticated) {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Corona Bay
              </Link>
              <Link
                to="/about"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "1%",
                }}
              >
                <Button color="inherit">About</Button>
              </Link>
              <Link
                to="/statistics"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  marginLeft: "1%",
                }}
              >
                <Button color="inherit">Statistics</Button>
              </Link>
              <Link
                to="/news"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  marginLeft: "1%",
                }}
              >
                <Button color="inherit">News</Button>
              </Link>
            </Typography>
            <Link
              to="/profile"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button color="inherit">Profile</Button>
            </Link>
            <Button onClick={() => props.logoutUser()} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return unauthenticatedNavbar(classes);
  }
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
