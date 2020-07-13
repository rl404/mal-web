import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  InputGroup
} from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <div id="navbar-header">
        <NavTop appName={this.props.appName.toLowerCase()} />
        <NavBottom />
      </div>
    );
  }
}

const NavTop = ({ appName }) => {
  return (
    <Nav className="navbar navbar-light" id="navbar-top">
      <Navbar.Brand href="/">
        <img src="/images/mal-logo-xsmall.png" alt={appName} />
      </Navbar.Brand>
      <Form inline>
        <Link to="" className="btn btn-outline-primary btn-sm nav-button" id="nav-button-login">
          Login
          </Link>
        <Link to="" className="btn btn-sm nav-button" id="nav-button-signup">
          Sign Up
        </Link>
      </Form>
    </Nav>
  );
}

const NavBottom = () => {
  return (
      <Navbar id="navbar-bottom" expand="lg">
        <Navbar.Toggle aria-controls="navbar-bottom-collapse" />
        <Navbar.Collapse id="navbar-bottom-collapse">
          <Nav className="mr-auto">
            <NavDropdown title="Anime">
              <NavDropdown.Item href="">Anime Search</NavDropdown.Item>
              <NavDropdown.Item href="">Top Anime</NavDropdown.Item>
              <NavDropdown.Item href="">Seasonal Anime</NavDropdown.Item>
              <NavDropdown.Item href="">Videos</NavDropdown.Item>
              <NavDropdown.Item href="">Reviews</NavDropdown.Item>
              <NavDropdown.Item href="">Recommendations</NavDropdown.Item>
              <NavDropdown.Item href="">2020 Challenge</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Manga">
              <NavDropdown.Item href="" className="dropdown-item">Manga Search</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Top Manga</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Manga Store</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Reviews</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Recommendations</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">2020 Challenge</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Community">
              <NavDropdown.Item href="" className="dropdown-item">Forums</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Clubs</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Blogs</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Users</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Discord Chat</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Industry">
              <NavDropdown.Item href="" className="dropdown-item">News</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Featured Articles</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">People</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Characters</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Watch">
              <NavDropdown.Item href="" className="dropdown-item">Episode Videos</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Promotional Videos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Read">
              <NavDropdown.Item href="" className="dropdown-item">Manga Store</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Help">
              <NavDropdown.Item href="" className="dropdown-item">About</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Supporting</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Advertising</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Report</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">Staff</NavDropdown.Item>
              <NavDropdown.Item href="" className="dropdown-item">MAL Supporter</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form inline>
            <InputGroup className="float-right">
              <InputGroup.Prepend>
                <Form.Group>
                  <Form.Control as="select">
                    <option>All</option>
                    <option>Anime</option>
                    <option>Manga</option>
                    <option>Characters</option>
                    <option>People</option>
                    <option>Manga Store</option>
                    <option>News</option>
                    <option>Featured Articles</option>
                    <option>Forum</option>
                    <option>Clubs</option>
                    <option>Users</option>
                  </Form.Control>
                </Form.Group>
              </InputGroup.Prepend>
              <Form.Control type="text" placeholder="Search Anime, Manga, and more..." />
              <InputGroup.Append>
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon="search" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Header;