import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Home from './components/Home';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="" component={Home} />
        {/* <IndexRoute component={Home} /> */}
        {/* <Route path="login" component={Login} /> */}
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
