import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import authenticated from '../utils/authenticated';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
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
              pathname: isPrivate ? '/' : '/profile',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
