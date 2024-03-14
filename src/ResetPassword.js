import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode from 'jwt-decode'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');
  const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
  const email = decodedToken.email;
  console.log(email)

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }

      const response = await axios.post('http://localhost:5000/updatepassword', { email, password });
      console.log(response.data);
      window.location.href = '/updated'; // Redirect to login page after password reset
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
