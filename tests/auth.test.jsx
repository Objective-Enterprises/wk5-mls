import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Login from '../src/pages/Auth/Login';
import Register from '../src/pages/Auth/Register';
import ResetPassword from '../src/pages/Auth/ResetPassword';
import App from '../src/App';

describe('Auth Components', () => {
  describe('Login Component', () => {
    it('renders the login form fields', () => {
      //Todo: Render Login component and verify all form fields are present

    });

    it('logs email and password on submit', async () => {
      //Todo: Spy on console.log, simulate user input and form submission, then verify the correct data is logged

    });
  });

  describe('Register Component', () => {
    it('renders the register form fields', () => {
      render(<Register />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('logs the form data on submit', async () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

      render(<Register />);
      await userEvent.type(screen.getByLabelText(/name/i), 'JohnDoe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /register/i }));

      expect(logSpy).toHaveBeenCalledWith('Register Attempt:', {
        name: 'JohnDoe',
        email: 'john@example.com',
        password: 'password123',
      });

      logSpy.mockRestore();
    });
  });

  describe('ResetPassword Component', () => {
    it('shows an error and does not reset when passwords do not match', async () => {
      const onResetPassword = vi.fn();

      render(<ResetPassword onResetPassword={onResetPassword} />);
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'old-password');
      await userEvent.type(screen.getByLabelText(/new password/i), 'new-password');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'different-password');
      await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

      expect(screen.getByRole('alert')).toHaveTextContent(/must match/i);
      expect(onResetPassword).not.toHaveBeenCalled();
    });

    it('calls the callback and shows a success message when passwords match', async () => {
      const onResetPassword = vi.fn();

      render(<ResetPassword onResetPassword={onResetPassword} />);
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'old-password');
      await userEvent.type(screen.getByLabelText(/new password/i), 'new-password');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'new-password');
      await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

      expect(onResetPassword).toHaveBeenCalledWith({
        email: 'john@example.com',
        oldPassword: 'old-password',
        newPassword: 'new-password',
        confirmPassword: 'new-password',
      });
      expect(screen.getByRole('status')).toHaveTextContent(/successfully/i);
    });
  });

  it('opens the reset-password page from the header', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: /forgot password/i }));

    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/old password/i)).toBeInTheDocument();
  });
});