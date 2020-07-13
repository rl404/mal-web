import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import MiniHeader from '../Header/MiniHeader';
import Left from './Left';
import { Container, Row, Col } from 'react-bootstrap';

const mapStateToProps = state => ({
  detail: state.animeDetail,
})

const mapDispatchToProps = dispatch => ({
  loadDetail: (payload) => dispatch({ type: 'ANIME_DETAIL', payload }),
})

class Anime extends React.Component {
  animeID = this.props.match.params.id
  animeName = this.props.match.params.name

  componentWillMount() {
    this.props.loadDetail(agent.Anime.detail(this.animeID));
  }

  render() {
    return (
      <div className="anime-page">
        <MiniHeader title={this.props.detail ? this.props.detail.title : ""} />
        <Container>
          <Row>
            <Col md={3} className="border-right">
              <Left data={this.props.detail} />
            </Col>
            <Col md={9}>
              asd
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Anime);