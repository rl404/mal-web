import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince, ellipsis, slugify } from '../../utils/utils';

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
        <Row className="border-bottom font-12">
          <Col md={9} xs={7} className="font-weight-bold">
            Anime & Manga News
          </Col>
          <Col md={3} xs={5} className="text-right">
            <Link to="/news" className="view-more">
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
                          <Link to={{ pathname: `/news/${news.id}/` + slugify(news.title) }}>
                            <Image src={news.image} alt={news.title} className="img-thumbnail" />
                          </Link>
                        </td>
                        <td className="content">
                          <Link to={{ pathname: `/news/${news.id}/` + slugify(news.title) }} className="font-weight-bold">{news.title}</Link>
                          <p>
                            {ellipsis(news.content, 250)}
                            <Link to={{ pathname: `/news/${news.id}/` + slugify(news.title) }}>read more</Link>
                          </p>
                          <p>
                            <span className="blend-text">{timeSince(news.date)} by <Link to={{ pathname: `/user/${news.username}` }}>{news.username}</Link> | <Link to="#">Discuss ({news.comment.toLocaleString()} comments)</Link></span>
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