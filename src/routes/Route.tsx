import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import authenticated from '../utils/authenticated';
import admin from '../utils/admin';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdmin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === authenticated() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              // eslint-disable-next-line no-nested-ternary
              pathname: isPrivate ? '/' : admin() ? '/profile' : '/admin',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
