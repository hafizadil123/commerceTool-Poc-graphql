import React from "react";
import ImageLogo from "../images/rogers-brand.png";
const Header = () => {
  return (
    <>
      <header className="header" role="main-header">
        <nav className="topbar">
          <div className="topbar__inner">
            <div className="topbar-links">
              <ul>
                <li className="bar-item">
                  <a href="#">
                    <span className="bold">Personal</span>
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#">
                    <span>Business</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topbar-nav">
              <div className="header-brand">
                <a href="#">
                  <img
                    src={ImageLogo}
                    alt="Logo Brand"
                  />
                </a>
              </div>
              <div className="hamburger">
                <span className="mobilenav-line1" />
                <span className="mobilenav-line2" />
                <span className="mobilenav-line3" />
              </div>
              <ul className="menu">
                <li className="bar-item">
                  <a href="#">
                    <span>On</span>
                    <i className="fas fa-angle-down ml-2 caret" />
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#">
                    <span>Fr</span>
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    <span>Find a store</span>
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#">
                    <i className="far fa-user-circle" />
                    <span>Sign in</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <nav className="main-navbar">
          <div className="navbar-inner">
            <div className="header-brand">
              <a href="#">
                <img src={ImageLogo} alt="Logo Brand" />
              </a>
            </div>
            <div className="main-navigation">
              <ul>
                <li className="bar-item">
                  <a href="#" className="item-link">
                    <span>shop</span>
                    <i className="fas fa-angle-down ml-2 caret" />
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#" className="item-link">
                    <span>My Rogers</span>
                  </a>
                </li>
                <li className="bar-item">
                  <a href="#" className="item-link">
                    <span>Support</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="quicklinks">
              <ul>
                <li>
                  <a href="#">
                    <i className="fas fa-search open" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
