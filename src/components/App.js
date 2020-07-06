import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Header appName={this.props.appName} />
          {this.props.children}
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