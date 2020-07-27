import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince, slugify, ellipsis } from '../../utils/utils';

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
        <Row className="border-bottom font-12">
          <Col md={9} xs={7} className="font-weight-bold">
            Latest Anime Recommendations
          </Col>
          <Col md={3} xs={5} className="text-right">
            <Link to="/recommendations" className="view-more">
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
                            <Col xl={1} sm={2} xs={2} className="no-padding">
                              <Link to={{ pathname: `/anime/${recommendation.source.liked.id}/` + slugify(recommendation.source.liked.title) }}>
                                <Image src={recommendation.source.liked.image} alt={recommendation.source.liked.title} className="img-thumbnail" />
                              </Link>
                            </Col>
                            <Col xl={5} sm={4} xs={10} className="content no-padding">
                              <p>If you liked</p>
                              <p><Link to={{ pathname: `/anime/${recommendation.source.liked.id}/` + slugify(recommendation.source.liked.title) }} className="font-weight-bold">{recommendation.source.liked.title}</Link></p>
                              <p><span className="add"><Link to="">add</Link></span></p>
                            </Col>
                            <Col xl={1} sm={2} xs={2} className="no-padding">
                              <Link to={{ pathname: `/anime/${recommendation.source.recommended.id}/` + slugify(recommendation.source.recommended.title) }}>
                                <Image src={recommendation.source.recommended.image} alt={recommendation.source.recommended.title} className="img-thumbnail" />
                              </Link>
                            </Col>
                            <Col xl={5} sm={4} xs={10} className="content no-padding">
                              <p>...then you might like</p>
                              <p><Link to={{ pathname: `/anime/${recommendation.source.recommended.id}/` + slugify(recommendation.source.recommended.title) }} className="font-weight-bold">{recommendation.source.recommended.title}</Link></p>
                              <p><span className="add"><Link to="">add</Link></span></p>
                            </Col>
                          </Row>
                          <Row className="content no-margin">
                            <p>
                              {ellipsis(recommendation.content, 200)}
                              <Link to={{ pathname: `/recommendation/anime/${recommendation.source.liked.id}-${recommendation.source.recommended.id}` }}>read more</Link>
                            </p>
                          </Row>
                          <Row className="content no-margin">
                            <p className="blend-text">
                              Anime rec by <Link to={{ pathname: `/user/${recommendation.username}` }}>{recommendation.username}</Link> - {timeSince(recommendation.date)}
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