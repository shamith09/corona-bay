import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import {
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  TextField,
  FormControlLabel,
  Box,
  Button,
  Checkbox,
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }
  }, [props.auth.isAuthenticated, props.history]);

  const formSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };

    props.registerUser(newUser, props.history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* Logo */}</Avatar>
        <Typography component="h1" variant="h5" style={{ color: "white" }}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={formSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Your Password"
                type="password"
                id="password2"
                onChange={(e) => {
                  setPassword2(e.target.value);
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="acceptTermsAndCondition" />}
                label="I accept the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <a
            href="/login"
            style={{
              color: "#E6E6FA",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Already have an account? Sign in
          </a>
        </form>
      </div>
      <Box mt={5} style={{ paddingTop: "5%" }}>
        <Copyright />
      </Box>
    </Container>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
