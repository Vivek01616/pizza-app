// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setAlert("Passwords don't match");
      return;
    }

    try {
      // Send signup data to the server
      const response = await Axios.post("http://localhost:5000/signup", formData);
      console.log(response);
      // Redirect to the email verification sent page
      navigate('/email-verification-sent');
    } catch (err) {
      console.log(err);
      setAlert('User Already Exists.');
    }
  };

  return (
    <div className="container">
      {alert && <div className="alert alert-danger" role="alert">{alert}</div>}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card cardb" style={{ width: '30rem', height: '30rem' }}>
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputUsername" className="form-label left-align">Username</label>
                  <input 
                    type="text" 
                    className="form-control custom-input" 
                    id="inputUsername" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label left-align">Email</label>
                  <input 
                    type="email" 
                    className="form-control custom-input" 
                    id="inputEmail" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label left-align">Password</label>
                  <input 
                    type="password" 
                    className="form-control custom-input" 
                    id="inputPassword" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label left-align">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control custom-input" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary pos">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
