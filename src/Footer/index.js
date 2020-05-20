import React from 'react';
import FooterImage from '../images/rogers-brand.png';
const Footer = () => {
    return ( <>
  <footer>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-sm-4">
        <a href="#" className="footer-logo-link">
          <div className="footer-logo">
            <img src={FooterImage} alt="Rogers" />
          </div>
        </a>
      </div>
      <div className="col-sm-8 text-md-right">
        <p className="m-0">© 1995 - 2020 Rogers Communications</p>
      </div>
    </div>
  </div>
</footer>

    </> );
}
 
export default Footer;