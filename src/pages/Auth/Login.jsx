import React, { useState } from 'react';
import "./Auth.css";

function Login() {
  // Define relevant state variables for login form

  const handleSubmit = e => {
    // Implement logic to print it on console and success on alert
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <form>
          <input placeholder='Email' />
          <input placeholder='Password' />
          <button>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;