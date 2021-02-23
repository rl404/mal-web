import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import routes from '../../routes';
import PropTypes from 'prop-types';

const Content = (props) => {
  return (
    <Switch>
      {routes.map((route, idx) => {
        return route.component && (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={renderProps => (
              <route.component {...renderProps} {...props} />
            )}
          />
        )
      })}
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

Content.propTypes = {
};

export default Content;