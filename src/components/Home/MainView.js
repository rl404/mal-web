import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Container, Row, Col } from 'react-bootstrap';
import SeasonalList from './Seasonal';
import { getCurrentSeason } from '../../utils/utils.js';

const mapStateToProps = state => ({
  data: state.animeSeasonal
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', payload }),
})

class MainView extends React.Component {
  componentWillMount() {
    var year = new Date().getFullYear();
    var season = getCurrentSeason()
    this.props.onLoad(agent.Seasonal.current(year, season))
  }

  render() {
    return (
      <Container className="border-side">
        <Row>
          <Col md={9} className="border-right">
            <SeasonalList data={this.props.data} />
          </Col>
          <Col md={3}>
            asd
        </Col>
        </Row>
      </Container>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);