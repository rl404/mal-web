import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Common/Breadcrumb';
import { Row, Col, Badge, ListGroup, Form, Table, Image, Card } from 'react-bootstrap';
import { ellipsis } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import ReactPlayer from 'react-player';
import { slugify, cleanKey, parseTime } from '../../utils/utils';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default class Detail extends React.Component {
  state = {
    visibleScore: {},
    visibleReview: {},
  }

  toggleScore = id => {
    this.setState(prevState => ({
      visibleScore: {
        ...prevState.visibleScore,
        [id]: !prevState.visibleScore[id],
      }
    }))
  }

  toggleReview = (id) => {
    this.setState(prevState => ({
      visibleReview: {
        ...prevState.visibleReview,
        [id]: !prevState.visibleReview[id],
      }
    }))
  }

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
        {characterStaff(data.characters, "Characters & Voice Actors")}
        {characterStaff(data.staff, "Staff", true)}
        {song(data.song)}
        {review(data.reviews, this)}
        {recommendation(data.recommendations)}
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

const characterStaff = (data, title, isStaff) => {
  if (!data || data.length === 0) {
    var type = "character or voice actors"
    if (isStaff) {
      type = "staff"
    }
    return (
      <div>
        <Row>
          <Col>
            <h2 className="title-border">{title}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              No {type} have been added to this title.
              Help improve our database by adding{type} <Link to="">here</Link>.
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  var splitCount = Math.ceil(data.length / 2)

  return (
    <div>
      <Row>
        <Col>
          <h2 className="title-border">{title}</h2>
        </Col>
      </Row>
      <Row id="char-split">
        <Col lg={6} md={12} className="char-area">
          <Table responsive size="sm">
            <tbody>
              {
                data.slice(0, splitCount).map(char => {
                  if (char.image === "") {
                    char.image = "/images/questionmark_23.gif";
                  }
                  return (
                    <tr key={char.id}>
                      <td className="text-left">
                        <Link to="">
                          <Image src={char.image} alt={char.name} className="img-thumbnail" />
                        </Link>
                      </td>
                      <td>
                        <p><Link to="">{char.name}</Link></p>
                        <p>{char.role}</p>
                      </td>
                      <td className="text-right">
                        <p><Link to="">{char.vaName}</Link></p>
                        <p>{char.vaRole}</p>
                      </td>
                      <td className="text-right">
                        {char.vaImage && char.vaImage !== "" ?
                          <Link to="">
                            <Image src={char.vaImage} alt={char.vaName} className="img-thumbnail" />
                          </Link>
                          : ""}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
        <Col lg={6} md={12} className="char-area">
          <Table responsive size="sm">
            <tbody>
              {
                data.slice(splitCount,).map(char => {
                  if (char.image === "") {
                    char.image = "/images/questionmark_23.gif";
                  }
                  return (
                    <tr key={char.id}>
                      <td className="text-left">
                        <Link to="">
                          <Image src={char.image} alt={char.name} className="img-thumbnail" />
                        </Link>
                      </td>
                      <td>
                        <p><Link to="">{char.name}</Link></p>
                        <p>{char.role}</p>
                      </td>
                      <td className="text-right">
                        <p><Link to="">{char.vaName}</Link></p>
                        <p>{char.vaRole}</p>
                      </td>
                      <td className="text-right">
                        {char.vaImage && char.vaImage !== "" ?
                          <Link to="">
                            <Image src={char.vaImage} alt={char.vaName} className="img-thumbnail" />
                          </Link>
                          : ""}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row id="char-full">
        <Col lg={6} md={12} className="char-area">
          <Table responsive size="sm">
            <tbody>
              {
                data.map(char => {
                  if (char.image === "") {
                    char.image = "/images/questionmark_23.gif";
                  }
                  return (
                    <tr key={char.id}>
                      <td className="text-left">
                        <Link to="">
                          <Image src={char.image} alt={char.name} className="img-thumbnail" />
                        </Link>
                      </td>
                      <td>
                        <p><Link to="">{char.name}</Link></p>
                        <p>{char.role}</p>
                      </td>
                      <td className="text-right">
                        <p><Link to="">{char.vaName}</Link></p>
                        <p>{char.vaRole}</p>
                      </td>
                      <td className="text-right">
                        {char.vaImage && char.vaImage !== "" ?
                          <Link to="">
                            <Image src={char.vaImage} alt={char.vaName} className="img-thumbnail" />
                          </Link>
                          : ""}
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

const song = data => {
  return (
    <div id="song-area">
      <Row>
        <Col lg={6} md={12}>
          <Row>
            <Col>
              <h2 className="title-border">Opening Theme</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {songList(data.opening, "opening")}
            </Col>
          </Row>
        </Col>
        <Col lg={6} md={12}>
          <Row>
            <Col>
              <h2 className="title-border">Ending Theme</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {songList(data.closing, "ending")}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const songList = (data, type) => {
  if (!data || data.length === 0) {
    return (
      <p>
        No {type} themes have been added to this title.
        Help improve our database by adding an {type} theme <Link to="">here</Link>.
      </p>
    )
  }

  return (
    data.map((song, i) => {
      return (
        <p key={i}>
          #{i + 1}: {song}
        </p>
      )
    })
  )
}

const review = (data, ts) => {
  if (!data || data.length === 0) {
    return (
      <div>
        <Row>
          <Col>
            <h2 className="title-border">Reviews</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              No reviews have been submitted for this title.
            Be the first to make a review <Link to="">here</Link>.
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div id="review-area">
      <Row>
        <Col>
          <h2 className="title-border">Reviews</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table size="sm">
            <tbody>
              {
                data.map((review, i) => {
                  if (review.image === "") {
                    review.image = "/images/questionmark_23.gif";
                  }
                  return (
                    <tr key={i}>
                      <td>
                        <Row>
                          <Col>
                            <Link to="">
                              <Image src={review.image} alt={review.username} className="img-thumbnail" />
                            </Link>
                          </Col>
                          <Col>
                            <p>
                              <Link to="">{review.username}</Link> (<Link to="">All reviews</Link>)
                            </p>
                            <p className="blend-text">
                              <b>{review.helpful}</b> people found this review helpful
                            </p>
                          </Col>
                          <Col className="text-right">
                            <p>
                              {parseTime(review.date, "MMM D, YYYY")}
                            </p>
                            <p className="blend-text">
                              {review.episode} episodes seen
                            </p>
                            <p>
                              <Link to="#" onClick={() => ts.toggleScore(review.id)}>Overall Rating</Link>: {review.score.overall}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={2} md={3} sm={12} className={!ts.state.visibleScore[review.id] ? "hide-div" : ""}>
                            {scoreTable(review.score)}
                          </Col>
                          <Col>
                            {reviewContent(review, ts)}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-right">
                            <Link className="blend-text" to="">permalink</Link> | <Link className="blend-text" to="">report</Link>
                          </Col>
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
}

const scoreTable = data => {
  return (
    <Table responsive size="sm" className="score-table">
      <thead>
        <tr>
          <th>Overall</th>
          <th>{data.overall}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Story</td>
          <td>{data.story}</td>
        </tr>
        <tr>
          <td>Animation</td>
          <td>{data.animation}</td>
        </tr>
        <tr>
          <td>Sound</td>
          <td>{data.sound}</td>
        </tr>
        <tr>
          <td>Character</td>
          <td>{data.character}</td>
        </tr>
        <tr>
          <td>Enjoyment</td>
          <td>{data.enjoyment}</td>
        </tr>
      </tbody>
    </Table>
  )
}

const reviewContent = (review, ts) => {
  if (review.review.length <= 500) {
    return <p>{review.review}</p>
  }

  return (
    <p>
      {review.review.substring(0, 500)}
      <span className={!ts.state.visibleReview[review.id] ? "hide-div" : ""}>{review.review.substring(500,)}</span>
      <Link to="#" onClick={() => ts.toggleReview(review.id)} className={ts.state.visibleReview[review.id] ? "hide-div" : ""}> read more</Link>
      <Link to="#" onClick={() => ts.toggleReview(review.id)} className={!ts.state.visibleReview[review.id] ? "hide-div" : ""}> read less</Link>
    </p>
  )
}

const recommendation = data => {
  if (!data || data.length === 0) {
    return
  }

  var responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 6,
      partialVisibilityGutter: 15
    },
    desktop_small: {
      breakpoint: { max: 1200, min: 990 },
      items: 5,
      partialVisibilityGutter: 15
    },
    tablet: {
      breakpoint: { max: 990, min: 767 },
      items: 4,
      partialVisibilityGutter: 5
    },
    phone: {
      breakpoint: { max: 767, min: 575 },
      items: 5,
      partialVisibilityGutter: 0
    },
    phone_small: {
      breakpoint: { max: 575, min: 0 },
      items: 4
    }
  };

  return (
    <div id="recommendation-area">
      <Row>
        <Col>
          <h2 className="title-border">Recommendations</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel responsive={responsive} infinite={true} partialVisible={true}>
            {
              data.map(anime => {
                var recCount = anime.count + " users"
                if (anime.count === 0) {
                  recCount = "AutoRec"
                }
                return (
                  <Link to="" key={anime.id}>
                    <Card>
                      <Card.Img src={anime.image} alt={anime.title} />
                      <Card.ImgOverlay>
                        <Card.Title>{recCount}</Card.Title>
                        <Card.Text>{anime.title}</Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  </Link>
                )
              })
            }
          </Carousel>
        </Col>
        <Col md={2} sm={12}>
            boy
        </Col>
      </Row>
    </div >
  )
}