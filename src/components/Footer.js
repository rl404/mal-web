import { Link } from 'react-router';
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        <div className="container">
          <div className="row">
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item" id="footer-home">
                <Link to="/">
                  Home
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  About
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Press Room
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Support
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Advertising
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  FAQ
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Terms
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Privacy
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Cookie
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Sitemap
                </Link>
              </li>
              <li className="list-group-item" id="footer-login">
                <Link to="/">
                  Login
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col" id="copyright">
              MyAnimeList.net is a property of MyAnimeList, LLC. ©2020 All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default Footer;