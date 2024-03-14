// VerificationPage.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VerifiedPage() {
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
      <p>Your email has been successfully verified</p>
    </div>
  );
}

export default VerifiedPage;
