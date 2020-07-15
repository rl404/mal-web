import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { capitalize, isCurrentSeason, getCurrentSeason, slugify } from '../../utils/utils';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    partialVisibilityGutter: 10
  },
  desktop_small: {
    breakpoint: { max: 1200, min: 990 },
    items: 3,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 990, min: 767 },
    items: 2,
    partialVisibilityGutter: 50
  },
  phone: {
    breakpoint: { max: 767, min: 575 },
    items: 2,
    partialVisibilityGutter: 70
  },
  phone_small: {
    breakpoint: { max: 575, min: 0 },
    items: 2
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
        <Row className="border-bottom font-12">
          <Col md={9} xs={7} className="font-weight-bold">
            {capitalize(getCurrentSeason())} {new Date().getFullYear()} Anime
          </Col>
          <Col md={3} xs={5} className="text-right">
            <Link to='' className="view-more">
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
                      <Link to={{ pathname: `/anime/${anime.id}/`+ slugify(anime.title) }} key={anime.id}>
                        <Card>
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
