import { Link } from 'react-router';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-top">
          <Link to="/" className="navbar-brand">
            <img src="/mal-logo-xsmall.png" alt={this.props.appName.toLowerCase()} />
          </Link>
          <form className="form-inline">
            <Link to="" className="btn btn-outline-primary btn-sm nav-button">
              Login
            </Link>
            <Link to="" className="btn btn-primary btn-sm nav-button">
              Sign Up
            </Link>
          </form>
        </nav>

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Anime
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link to="" className="dropdown-item">Anime Search</Link>
                  <Link to="" className="dropdown-item">Top Anime</Link>
                  <Link to="" className="dropdown-item">Seasonal Anime</Link>
                  <Link to="" className="dropdown-item">Videos</Link>
                  <Link to="" className="dropdown-item">Reviews</Link>
                  <Link to="" className="dropdown-item">Recommendations</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;