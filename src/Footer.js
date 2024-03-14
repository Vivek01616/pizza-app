import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Footer({ isLoggedIn }) {
  return (
    <footer className="footer mt-auto py-5 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-4">About Us</h5>
            <p>We are dedicated to providing the best pizza experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="col-md-4 ql">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              {isLoggedIn ? (
                <li><Link to="/userdashboard" className="text-light">Home</Link></li>
              ) : (
                <li><Link to="/" className="text-light">Home</Link></li>
              )}
              <li><Link to="/adminsignin" className="text-light">Admin</Link></li>
              <li><Link to="/locations" className="text-light">Locations</Link></li>
              <li><Link to="/contact" className="text-light">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-4">Contact Us</h5>
            <address className="text-light">
              <strong>Pizza App</strong><br />
              123 Main Street<br />
              City, State 12345<br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </address>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="mb-0">&copy; {new Date().getFullYear()} Pizza App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
