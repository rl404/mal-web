import App from './components/App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';
import Home from './components/Home';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'popper.js/dist/umd/popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

ReactDOM.render((
  <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          {/* <Route path="login" component={Login} /> */}
        </Route>
      </Router>
  </Provider>
), document.getElementById('root'));
