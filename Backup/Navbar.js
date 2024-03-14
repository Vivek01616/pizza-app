import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount, isLoggedIn, handleSignOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://static.vecteezy.com/system/resources/previews/029/160/372/non_2x/tasty-top-view-pizza-italian-traditional-round-pizza-on-white-background-ai-generative-free-photo.jpg" alt="Pizza" width="30" height="30" className="d-inline-block align-text-top me-2" />
          <span className="fw-bold">Pizza App</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/userdashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Orders">Your Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Cart">Cart ({cartCount})</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleSignOut}>Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
