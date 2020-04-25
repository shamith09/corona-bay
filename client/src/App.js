import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import NoRouteMatch from "./components/NoRouteMatch";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Statistics from "./pages/Statistics";
import About from "./pages/About";
import News from "./pages/News";
import Detection from "./pages/Detection";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticatedpracticepractice
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/news" component={News} />
          <Route exact path="/detection" component={Detection} />


          <PrivateRoute exact path="/profile" component={Profile} />
          <Route component={NoRouteMatch} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
