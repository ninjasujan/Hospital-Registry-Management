import React from "react";

import { Route, Redirect } from "react-router-dom";

const LoginRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const AuthRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const SignupRoute = ({ component: Component, isSignedUp, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignedUp ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export { LoginRoute, AuthRoute, SignupRoute };
