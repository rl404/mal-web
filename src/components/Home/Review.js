import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince } from '../../utils/utils';

export default class Review extends React.Component {
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
      <div id="home-review">
        <Row className="border-bottom">
          <Col className="font-weight-bold">
            Latest Anime Reviews
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
                  data.map(review => {
                    return (
                      <tr key={review.id} className="border-bottom-light">
                        <td className="img-col">
                          <Link to="">
                            <Image src={review.source.image} alt={review.source.title} className="img-thumbnail" />
                          </Link>
                        </td>
                        <td className="content">
                          <Link to="" className="font-weight-bold">{review.source.title}</Link>  <span className="add"><Link to="">add</Link></span>
                          <span className="blend-text float-right">Overall Rating: {review.score.overall}</span>
                          <p>
                            {review.review.substring(0, 350)}...
                            <Link to="">read more</Link>
                          </p>
                          <p>
                            <span className="blend-text">{timeSince(review.date)} by <Link to="">{review.username}</Link></span>
                          </p>
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