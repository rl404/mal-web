import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Common/Breadcrumb';
import { Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { ellipsis } from '../../utils/utils';

export default class Detail extends React.Component {
  render() {
    var data = this.props.data
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    var breadcrumb = [
      {
        "name": "Top",
        "link": "",
      },
      {
        "name": "Anime",
        "link": "",
      },
      {
        "name": ellipsis(data.title, 30),
        "link": "",
      }
    ]

    return (
      <div id="anime-details">
        <Breadcrumb data={breadcrumb} />
        {stats(data)}
      </div>
    )
  }
}

const stats = (data) => {
  return (
    <Row>
      <Col>
        <Row className="stats-area no-margin">
          <Col md={2} className="text-center border-right no-padding">
            <Row>
              <Col>
                <Badge variant="primary" id="score-badge">SCORE</Badge>
              </Col>
            </Row>
            <Row>
              <Col id="score-value">
                {data.score.toFixed(2)}
              </Col>
            </Row>
            <Row>
              <Col id="score-voter">
                {data.voter.toLocaleString()} users
              </Col>
            </Row>
          </Col>
          <Col className="text-center" id="other-stats-area">
            <Row>
              <Col className="other-stats-value">
                Ranked <span className="font-weight-bold">#{data.rank.toLocaleString()}</span>
              </Col>
              <Col className="other-stats-value">
                Popularity <span className="font-weight-bold">#{data.popularity.toLocaleString()}</span>
              </Col>
              <Col className="other-stats-value">
                Members <span className="font-weight-bold">{data.member.toLocaleString()}</span>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal id="stats-info">
                {data.premiered !== "" ? <ListGroup.Item><Link to="">{data.premiered}</Link></ListGroup.Item> : ""}
                <ListGroup.Item><Link to="">{data.type}</Link></ListGroup.Item>
                <ListGroup.Item>{studio(data.studios)}</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>
        <Row className="stats-area no-margin">
          <Col md={2}>
            add
          </Col>
          <Col md={2}>
            add
          </Col>
          <Col md={2}>
            add
          </Col>
        </Row>
      </Col>
      <Col md={2}>
        qwe
          </Col>
    </Row>
  )
}

const studio = data => {
  if (!data || data.length === 0) {
    return "?"
  }

  return data
    .map((p) => <Link to="" key={p.id}>{p.name}</Link>)
    .reduce((prev, curr) => [prev, ", ", curr]);
}