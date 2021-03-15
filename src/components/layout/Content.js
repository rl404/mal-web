import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes';

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
  showEntryDrawer: PropTypes.func.isRequired,
  showHistoryModal: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Content;