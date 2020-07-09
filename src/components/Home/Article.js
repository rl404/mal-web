import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { timeSince } from '../../utils/utils';

export default class Article extends React.Component {
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
      <div id="home-article">
        <Row className="border-bottom">
          <Col className="font-weight-bold">
            Featured Articles
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
                  data.map(article => {
                    return (
                      <tr key={article.id} className="border-bottom-light">
                        <td className="img-col">
                          <Link to="">
                            <Image src={article.image} alt={article.title} className="img-thumbnail" />
                          </Link>
                        </td>
                        <td className="content">
                          <Link to="" className="font-weight-bold">{article.title}</Link>
                          <p>{article.summary}</p>
                          <p>
                            <span className="blend-text">{timeSince(article.date)} by <Link to="">{article.username}</Link> | <span className="font-weight-bold">{article.view}</span> views {getBadge(article)}
                            </span>
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

const getBadge = (article) => {
  if (article.is_spoiler && article.is_advertorial) {
    return <span>
      |
      <span className="badge badge-pill badge-danger">Spoiler</span>
      <span className="badge badge-pill badge-primary"> Advertorial</span>
    </span>
  }
  if (article.is_spoiler) {
    return <span>
      | <span className="badge badge-pill badge-danger">Spoiler</span>
    </span>
  }
  if (article.is_advertorial) {
    return <span>
      | <span className="badge badge-pill badge-primary"> Advertorial</span>
    </span>
  }
  return ""
}