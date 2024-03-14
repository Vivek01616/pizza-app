import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/signin", formData)
      .then(response => {
        if (typeof onLogin === 'function') {
          onLogin(response.data.user.email); // Pass user email to onLogin function
        }
        navigate('/userdashboard');
      })
      .catch(err => {
        setAlert('Invalid email or password. Please try again.');
      });
  };

  return (
    <div>
      {alert && <div className="alert alert-danger" role="alert">{alert}</div>}
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card cardb" style={{ width: '30rem', height: '23rem' }}>
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="inputEmail3" className="form-label form-label-left">Email</label>
                    <input 
                      type="email" 
                      className="form-control custom-input" 
                      id="inputEmail3" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword3" className="form-label form-label-left">Password</label>
                    <input 
                      type="password" 
                      className="form-control custom-input" 
                      id="inputPassword3" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary pos" >Sign in</button>
                </form>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <br></br>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                  <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
