import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Common/Breadcrumb';
import { Row, Col, Badge, ListGroup, Form, Table } from 'react-bootstrap';
import { ellipsis } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import ReactPlayer from 'react-player';
import { slugify, cleanKey } from '../../utils/utils';

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
        {synopsis(data.synopsis)}
        {related(data.related)}
        {character(data.characters)}
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
          <Col id="other-stats-area">
            <Row>
              <ListGroup horizontal={'lg'}>
                <ListGroup.Item className="other-stats-value">
                  Ranked <span className="font-weight-bold">#{data.rank.toLocaleString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="other-stats-value">
                  Popularity <span className="font-weight-bold">#{data.popularity.toLocaleString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="other-stats-value">
                  Members <span className="font-weight-bold">{data.member.toLocaleString()}</span>
                </ListGroup.Item>
              </ListGroup>
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
          <Col>
            <Form inline id="add-form">
              <Link to="" className="btn btn-sm" id="add-list-button">
                <FontAwesomeIcon icon={faPlusSquare} />  Add to List
              </Link>
              <Form.Control as="select" id="select-score">
                <option value="0">Select</option>
                <option value="10">(10) Masterpiece</option>
                <option value="9">(9) Great</option>
                <option value="8">(8) Very Good</option>
                <option value="7">(7) Good</option>
                <option value="6">(6) Fine</option>
                <option value="5">(5) Average</option>
                <option value="4">(4) Bad</option>
                <option value="3">(3) Very Bad</option>
                <option value="2">(2) Horrible</option>
                <option value="1">(1) Appalling</option>
              </Form.Control>
              <div id="input-episode">
                Episodes:
                <Form.Control placeholder="0" />
                /{data.episode === "" ? "?" : data.episode}
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
      {video(data.video)}
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

const video = data => {
  if (data === "") {
    return
  }

  return (
    <Col md={3} id="preview-video">
      <ReactPlayer
        url={data}
        light
        width={190}
        height={100} />
    </Col>
  )
}

const synopsis = data => {
  if (data === "") {
    data = <span>No synopsis information has been added to this title. Help improve our database by adding a synopsis <Link to="">here</Link>.</span>
  }

  return (
    <div>
      <Row>
        <Col>
          <h2 className="title-border">Synopsis</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{data}</p>
        </Col>
      </Row>
    </div>
  )
}

const related = data => {
  if (!data || data.length === 0) {
    return
  }

  return (
    <div id="related-area">
      <Row>
        <Col>
          <h2 className="title-border">Related Anime</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive size="sm">
            <tbody>
              {
                Object.keys(data).map(function (k) {
                  return (
                    <tr className="border-bottom-light" key={k}>
                      <td className="text-right">
                        {cleanKey(k)}:
                      </td>
                      <td>
                        {
                          data[k]
                            .map((rel) => <Link to={{ pathname: `/${rel.type}/${rel.id}/` + slugify(rel.title) }} key={rel.id}>{rel.title}</Link>)
                            .reduce((prev, curr) => [prev, ", ", curr])
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

const character = data => {
  if (!data || data.length === 0) {
    return (
      <div>
        <Row>
          <Col>
            <h2 className="title-border">Characters & Voice Actors</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              No characters or voice actors have been added to this title.
              Help improve our database by adding characters or voice actors <Link to="">here</Link>.
            </p>
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <div>
      <Row>
        <Col>
          <h2 className="title-border">Characters & Voice Actors</h2>
        </Col>
      </Row>
      <Row>
        <Col>
         asd
        </Col>
        <Col>
          qwqe
        </Col>
      </Row>
    </div>
  )
}