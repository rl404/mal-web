import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));
