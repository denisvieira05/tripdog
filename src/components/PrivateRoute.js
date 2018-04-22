import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default PrivateRoute