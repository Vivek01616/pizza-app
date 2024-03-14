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
import Contact from './Contact';
import Locations from './Locations';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const incrementCartCount = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const clearCartCount = () => {
    setCartCount(0);
  };

  const handleLogin = (email, isAdmin) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    if (isAdmin) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
    } else {
      localStorage.removeItem('isAdminLoggedIn');
    }
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdminLoggedIn');
    setUserEmail(null);
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const adminLoggedInStatus = localStorage.getItem('isAdminLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    if (adminLoggedInStatus === 'true') {
      setIsAdminLoggedIn(true);
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
        <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} isAdminLoggedIn={isAdminLoggedIn} handleSignOut={handleSignOut} />
        <Routes>
          <Route path="/userdashboard" element={<UserDashboard incrementCartCount={incrementCartCount} />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/Home" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/Signin" element={<Signin onLogin={handleLogin} />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Cart" element={<Cart clearCartCount={clearCartCount} />} />
          <Route path="/Forgotpassword" element={<ForgotPassword />} />
          <Route path="/email-verification-sent" element={<VerificationPage />} />
          <Route path="/verified" element={<VerifiedPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<Orders userEmail={userEmail} />} />
          <Route path="/ResetPassword" element={<ResetPassword/>}/>
          <Route path="/updated" element={<Updated/>}/>
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/adminsignin" element={<Adminsignin onLogin={handleLogin} />} />
          <Route path="/locations" element={<Locations/>}/>
        </Routes>
        <Footer isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
