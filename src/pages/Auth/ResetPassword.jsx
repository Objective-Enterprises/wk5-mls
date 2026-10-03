import React, { useState } from 'react';
import './Auth.css';

function ResetPassword({ onResetPassword }) {
  const [form, setForm] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isReset, setIsReset] = useState(false);

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError('');
    setIsReset(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirm password must match.');
      setIsReset(false);
      return;
    }

    setError('');
    onResetPassword(form);
    setIsReset(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <label htmlFor="old-password">Old password</label>
          <input
            id="old-password"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Old password"
            required
          />
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            name="newPassword"
            type="text"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New password"
            required
          />
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="text"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {error && <p role="alert">{error}</p>}
        {isReset && <p role="status">Password reset successfully.</p>}
      </div>
    </div>
  );
}

export default ResetPassword;