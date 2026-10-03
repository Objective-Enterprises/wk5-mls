import React, { useState } from 'react';
import "./Auth.css";

function Login() {
  // Define relevant state variables for login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    // Implement logic to print it on console and success on alert
    event.preventDefault()
    console.log(email)
    console.log(password)
    alert('Successful login')
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            placeholder='Email'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <input
            placeholder='Password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <button>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;