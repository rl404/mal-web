import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import BackdropLoading from './components/loading/Backdrop';

const Layout = React.lazy(() => import('./components/layout'));

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={<BackdropLoading />}>
          <Switch>
            <Route path="/" name="Home" render={props => <Layout {...props} />} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  };
}

export default App;
