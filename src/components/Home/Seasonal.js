import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { capitalize, isCurrentSeason, getCurrentSeason } from '../../utils/utils.js';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    partialVisibilityGutter: 40
  },
  desktop_small: {
    breakpoint: { max: 1200, min: 1024 },
    items: 4,
    partialVisibilityGutter: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 990 },
    items: 3,
    partialVisibilityGutter: 60
  },
  tablet_small: {
    breakpoint: { max: 990, min: 464 },
    items: 3,
  },
  phone: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  }
};

export default class SeasonalList extends React.Component {
  render() {
    var data = this.props.data
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    if (data.length === 0) {
      return (
        <div>Empty Season</div>
      );
    }

    return (
      <div id="home-seasonal">
        <Row className="border-bottom">
          <Col id="home-seasonal-title">
            {capitalize(getCurrentSeason())} {new Date().getFullYear()} Anime
          </Col>
          <Col className="text-right" id="home-seasonal-more">
            <Link to=''>
              View More
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Carousel responsive={responsive} infinite={true} partialVisible={true}>
              {
                data.map(anime => {
                  if (isCurrentSeason(anime.startDate) && anime.type === 'TV') {
                    return (
                      <Link to="" key={anime.id}>
                        <Card href="">
                          <Card.Img src={anime.image} alt={anime.title} />
                          <Card.ImgOverlay>
                            <Card.Text>{anime.title}</Card.Text>
                          </Card.ImgOverlay>
                        </Card>
                      </Link>
                    )
                  }
                  return [];
                })
              }
            </Carousel>
          </Col>
        </Row>
      </div >
    );
  }
}
