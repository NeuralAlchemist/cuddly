import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-link">
        <h5>About us</h5>
      </Link>

      <Link to="/" className="footer-link">
        <h5>Terms and conditions</h5>
      </Link>
    </footer>
  );
}

export default Footer;
