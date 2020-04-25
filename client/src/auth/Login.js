import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Box,
  makeStyles,
} from "@material-ui/core";

import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }

    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.auth.isAuthenticated, props.errors, props.history]);

  const formSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  return (
    <div style={{ height: "100%", minHeight: "80vh", marginTop: "6%" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>{/* LOGO */}</Avatar>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={formSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              inputProps={{
                style: { WebkitBoxShadow: "0 0 0 1000px #084177 inset" },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              inputProps={{
                style: { WebkitBoxShadow: "0 0 0 1000px #084177 inset" },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            {Object.keys(errors).length !== 0
              ? Object.keys(errors).map((obj, i) => (
                  <p style={{ color: "red" }}>{errors[obj]}</p>
                ))
              : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <a
              href="/register"
              style={{
                color: "#E6E6FA",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Don't have an account? Sign Up
            </a>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
