import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home';
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
          <Route path="" component={Home} />
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