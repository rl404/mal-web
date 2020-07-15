import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import MiniHeader from '../Header/MiniHeader';
import Left from './Left';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Detail from './Detail';

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
        <Container className="border-side">
          <Row>
            <Col md={3} className="border-right">
              <Left data={this.props.detail} />
            </Col>
            <Col md={9} className="padding-top-10">
              <Tabs>
                <Tab eventKey="details" title="Details">
                  <Detail data={this.props.detail} />
                </Tab>
                <Tab eventKey="videos" title="Videos">
                  qwe
                </Tab>
                <Tab eventKey="episodes" title="Episodes">
                  asd
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  asd
                </Tab>
                <Tab eventKey="recommendations" title="Recommendations">
                  asd
                </Tab>
                <Tab eventKey="stats" title="Stats">
                  asd
                </Tab>
                <Tab eventKey="character-staff" title="Characters & Staff">
                  asd
                </Tab>
                <Tab eventKey="news" title="News">
                  asd
                </Tab>
                <Tab eventKey="forums" title="Forums">
                  asd
                </Tab>
                <Tab eventKey="featured" title="Featured">
                  asd
                </Tab>
                <Tab eventKey="clubs" title="Clubs">
                  asd
                </Tab>
                <Tab eventKey="pictures" title="Pictures">
                  asd
                </Tab>
                <Tab eventKey="more-info" title="More info">
                  asd
                </Tab>
              </Tabs>
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Anime);