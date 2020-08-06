import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const loading = (
  <>
    loading
  </>
)

const Layout = React.lazy(() => import('./components/layout'))

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="/" name="Home" render={props => <Layout {...props} />} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
