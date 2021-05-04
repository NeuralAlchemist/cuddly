import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import '../../src/styles/base/typography.css';
import '../../src/styles/base/variables.css';
import '../../src/styles/components/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Link className="footer-link">
        <h5>About us</h5>
      </Link>

      <Link className="footer-link">
        <h5>Terms and conditions</h5>
      </Link>
    </footer>
  );
}

export default Footer;
