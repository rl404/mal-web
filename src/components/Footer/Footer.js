import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        <Container>
          <Row>
            <ListGroup horizontal>
              <ListGroup.Item  id="footer-home"><Link to="">Home</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">About</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Press Room</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Support</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Advertising</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">FAQ</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Terms</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Privacy</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Cookie</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Sitemap</Link></ListGroup.Item>
              <ListGroup.Item  id="footer-login"><Link to="">login</Link></ListGroup.Item>
              <ListGroup.Item ><Link to="">Sign Up</Link></ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <Col id="copyright">
              MyAnimeList.net is a property of MyAnimeList, LLC. ©2020 All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;