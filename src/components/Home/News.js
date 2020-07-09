import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince } from '../../utils/utils';

export default class News extends React.Component {
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
      <div id="home-news">
        <Row className="border-bottom">
          <Col className="font-weight-bold">
            Anime & Manga News
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
                  data.map(news => {
                    return (
                      <tr key={news.id}>
                        <td className="img-col">
                          <Link to="">
                            <Image src={news.image} alt={news.title} className="img-thumbnail" />
                          </Link>
                        </td>
                        <td className="content">
                          <Link to="" className="font-weight-bold">{news.title}</Link>
                          <p>
                            {news.content.substring(0, 250)}...
                            <Link to="">read more</Link>
                          </p>
                          <p>
                            <span className="blend-text">{timeSince(news.date)} by <Link to="">{news.username}</Link> | <Link to="">Discuss ({news.comment} comments)</Link></span>
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