import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home';
import Anime from './Anime';
import Footer from './Footer/Footer';

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Header appName={this.props.appName} />
          <Route exact path="/" component={Home} />
          <Route path="/anime/:id/:name?" component={Anime} />
        </Container>
        <Footer />
      </div>
    );
  }
}

// App.contextType = {
//   router: React.PropTypes.object.isRequired
// }

export default connect(mapStateToProps, () => ({}))(App);