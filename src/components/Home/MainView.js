import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Container, Row, Col } from 'react-bootstrap';
import SeasonalList from './Seasonal';
import TopAiring from './TopAiring';
import { getCurrentSeason } from '../../utils/utils.js';

const mapStateToProps = state => ({
  animeSeasonal: state.homeSeasonal,
  topAiring: state.homeTopAiring,
});

const mapDispatchToProps = dispatch => ({
  loadSeasonal: (payload) => dispatch({
    type: 'HOME_SEASONAL', payload
  }),
  loadTopAiring: (payload) => dispatch({
    type: 'HOME_TOP_AIRING', payload
  }),
})

class MainView extends React.Component {
  componentWillMount() {
    var year = new Date().getFullYear();
    var season = getCurrentSeason();
    this.props.loadSeasonal(agent.Seasonal.current(year, season));
    this.props.loadTopAiring(agent.Top.anime(1, 1));
  };

  render() {
    return (
      <Container className="border-side">
        <Row>
          <Col md={9} className="border-right">
            <SeasonalList data={this.props.animeSeasonal} />
          </Col>
          <Col md={3}>
            <TopAiring data={this.props.topAiring} />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);