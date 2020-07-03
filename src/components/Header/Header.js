import { Link } from 'react-router';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div id="navbar-header">
        <nav className="navbar navbar-light" id="navbar-top">
          <Link to="/" className="navbar-brand">
            <img src="/images/mal-logo-xsmall.png" alt={this.props.appName.toLowerCase()} />
          </Link>
          <form className="form-inline">
            <Link to="" className="btn btn-outline-primary btn-sm nav-button" id="nav-button-login">
              Login
            </Link>
            <Link to="" className="btn btn-sm nav-button" id="nav-button-signup">
              Sign Up
            </Link>
          </form>
        </nav>

        <nav className="navbar navbar-expand-lg navbar-dark" id="navbar-bottom">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-toggle">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-anime" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Anime
                </a>
                <div className="dropdown-menu" aria-labelledby="navbar-anime">
                  <Link to="" className="dropdown-item">Anime Search</Link>
                  <Link to="" className="dropdown-item">Top Anime</Link>
                  <Link to="" className="dropdown-item">Seasonal Anime</Link>
                  <Link to="" className="dropdown-item">Videos</Link>
                  <Link to="" className="dropdown-item">Reviews</Link>
                  <Link to="" className="dropdown-item">Recommendations</Link>
                  <Link to="" className="dropdown-item">2020 Challenge</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-manga" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Manga
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-manga">
                  <Link to="" className="dropdown-item">Manga Search</Link>
                  <Link to="" className="dropdown-item">Top Manga</Link>
                  <Link to="" className="dropdown-item">Manga Store</Link>
                  <Link to="" className="dropdown-item">Reviews</Link>
                  <Link to="" className="dropdown-item">Recommendations</Link>
                  <Link to="" className="dropdown-item">2020 Challenge</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-community" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Community
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-community">
                  <Link to="" className="dropdown-item">Forums</Link>
                  <Link to="" className="dropdown-item">Clubs</Link>
                  <Link to="" className="dropdown-item">Blogs</Link>
                  <Link to="" className="dropdown-item">Users</Link>
                  <Link to="" className="dropdown-item">Discord Chat</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-industry" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Industry
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-industry">
                  <Link to="" className="dropdown-item">News</Link>
                  <Link to="" className="dropdown-item">Featured Articles</Link>
                  <Link to="" className="dropdown-item">People</Link>
                  <Link to="" className="dropdown-item">Characters</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-watch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Watch
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-watch">
                  <Link to="" className="dropdown-item">Episode Videos</Link>
                  <Link to="" className="dropdown-item">Promotional Videos</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-read" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Read
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-read">
                  <Link to="" className="dropdown-item">Manga Store</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbar-help" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Help
              </a>
                <div className="dropdown-menu" aria-labelledby="navbar-help">
                  <Link to="" className="dropdown-item">About</Link>
                  <Link to="" className="dropdown-item">Supporting</Link>
                  <Link to="" className="dropdown-item">Advertising</Link>
                  <Link to="" className="dropdown-item">FAQ</Link>
                  <Link to="" className="dropdown-item">Report</Link>
                  <Link to="" className="dropdown-item">Staff</Link>
                  <Link to="" className="dropdown-item">MAL Supporter</Link>
                </div>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0">
              <div className="input-group">
                <div className="input-group-append">
                  <select className="custom-select">
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
                  </select>
                </div>
                <input type="text" className="form-control" placeholder="Search Anime, Manga, and more..."></input>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;