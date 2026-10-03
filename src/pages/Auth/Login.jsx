import React, { useState } from 'react';
import loginImage from '../../assets/login-placeholder.jpg';
import styles from './Login.module.css';

function Login({ onNavigate }) {
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
    <section className={styles.page} aria-labelledby="login-title">
      <div className={styles.panel}>
        <div className={styles.formContent}>
          <p className={styles.eyebrow}>Threadhive</p>
          <h1 id="login-title">Welcome back</h1>
          <p className={styles.intro}>
            Pick up where you left off and keep your conversations moving.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                required
              />
            </div>

            <div className={styles.formMeta}>
              <label className={styles.remember}>
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <button
                className={styles.textLink}
                type="button"
                onClick={() => onNavigate?.('reset-password')}
              >
                Forgot password?
              </button>
            </div>

            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </form>

          <p className={styles.signupPrompt}>
            New to Threadhive?{' '}
            <button
              className={styles.textLink}
              type="button"
              onClick={() => onNavigate?.('register')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      <div className={styles.visual}>
        <img src={loginImage} alt="Misty mountain landscape at sunrise" />
        <div className={styles.visualCopy}>
          <p>Make space for better conversations.</p>
          <span>Thoughtful threads start here.</span>
        </div>
      </div>
    </section>
  );
}

export default Login;