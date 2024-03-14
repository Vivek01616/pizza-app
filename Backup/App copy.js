import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import Cart from './Cart';
import ForgotPassword from './Forgotpassword';
import VerificationPage from './VerificationPage';
import VerifiedPage from './VerifiedPage';
import Checkout from './Checkout';
import Order from './Order';
import Orders from './Orders';
import ResetPassword from './ResetPassword';
import Updated from './Updated';
import Footer from './Footer';
import Adminsignin from './Adminsignin';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  const incrementCartCount = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const clearCartCount = () => {
    setCartCount(0);
  };

  const handleLogin = (email) => { // Receive userEmail as a parameter
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setUserEmail(email); // Set userEmail state
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setUserEmail(null); // Clear userEmail state upon sign out
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  return (
    <Router>
      <div>
        <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
        <Routes>
          <Route path="/userdashboard" element={<UserDashboard incrementCartCount={incrementCartCount} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin onLogin={handleLogin} />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Cart" element={<Cart clearCartCount={clearCartCount} />} />
          <Route path="/Forgotpassword" element={<ForgotPassword />} />
          <Route path="/email-verification-sent" element={<VerificationPage />} />
          <Route path="/verified" element={<VerifiedPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} /> {/* Pass userEmail as prop */}
          <Route path="/orders" element={<Orders userEmail={userEmail} />} /> {/* Pass userEmail as prop */}
          <Route path="/ResetPassword" element={<ResetPassword/>}/>
          <Route path="/updated" element={<Updated/>}/>
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
          <Route path="/adminsignin" element={<Adminsignin/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
