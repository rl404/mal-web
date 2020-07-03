import Header from './Header/Header';
import Footer from './Footer';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Header appName={this.props.appName} />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.contextType = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, () => ({}))(App);