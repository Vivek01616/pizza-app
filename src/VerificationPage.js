// VerificationPage.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VerificationPage() {
  const location = useLocation();

  useEffect(() => {
    // Extract email from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    // You can now perform verification steps if needed, or simply display a message
    console.log("Verification for email:", email);
  }, [location.search]);

  return (
    <div>
      <h1>Email Verification Page</h1>
      <p>Verification mail has sent to you mail Please check inbox</p>
    </div>
  );
}

export default VerificationPage;
