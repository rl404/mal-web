import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince } from '../../utils/utils';

export default class Recommendation extends React.Component {
  render() {
    var data = this.props.data
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    if (data.length === 0) {
      return (
        <div>Empty Data</div>
      );
    }

    return (
      <div id="home-recommendation">
        <Row className="border-bottom">
          <Col className="font-weight-bold">
            Latest Anime Recommendations
          </Col>
          <Col className="text-right">
            <Link to='' className="view-more">
              View More
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive size="sm">
              <tbody>
                {
                  data.map((recommendation, index) => {
                    return (
                      <tr key={index} className="border-bottom-light">
                        <td>
                          <Row className="no-margin">
                            <Col md={1} className="no-padding img-col">
                              <Link to="">
                                <Image src={recommendation.source.liked.image} alt={recommendation.source.liked.title} className="img-thumbnail" />
                              </Link>
                            </Col>
                            <Col md={5} className="content no-padding">
                              <p>
                                If you liked <br />
                                <Link to="" className="font-weight-bold">{recommendation.source.liked.title}</Link><br />
                                <span className="add"><Link to="">add</Link></span>
                              </p>
                            </Col>
                            <Col md={1} className="no-padding img-col">
                              <Link to="">
                                <Image src={recommendation.source.recommended.image} alt={recommendation.source.recommended.title} className="img-thumbnail" />
                              </Link>
                            </Col>
                            <Col md={5} className="content no-padding">
                              <p>
                                ...then you might like <br />
                                <Link to="" className="font-weight-bold">{recommendation.source.recommended.title}</Link><br />
                                <span className="add"><Link to="">add</Link></span>
                              </p>
                            </Col>
                          </Row>
                          <Row className="content no-margin">
                            <p>
                              {recommendation.content.substring(0, 200)}...
                              <Link to="">read more</Link>
                            </p>
                            <p className="blend-text">
                              Anime rec by <Link to="">{recommendation.username}</Link> - {timeSince(recommendation.date)}
                            </p>
                          </Row>
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
  };
}