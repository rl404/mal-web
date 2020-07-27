import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';

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
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/anime/:id/:name?" component={Anime} />

            {/* 
            
            <Route path="/anime/season/:year?/:season?" />
            <Route path="/top/:type" />
            <Route path="/news" />
            <Route path="/news/:id/:title?" /> 
            <Route path="/user/:user" />
            <Route path="/articles" />
            <Route path="/article/:id/:title" />
            <Route path="/reviews" />
            <Route path="/review/:id" />
            <Route path="/recommendations" />
            <Route path="/recommendation/:type/:id1-:id2" />
          
          */}
          </BrowserRouter>
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