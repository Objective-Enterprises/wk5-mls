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
      render(<Login />);

      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('reflects typed values in the controlled inputs', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'jane@example.com');
      await user.type(passwordInput, 'secure-password');

      expect(emailInput).toHaveValue('jane@example.com');
      expect(passwordInput).toHaveValue('secure-password');
    });

    it('logs the submitted credentials and shows a success alert', async () => {
      const user = userEvent.setup();
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });

      render(<Login />);
      await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
      await user.type(screen.getByLabelText(/password/i), 'secure-password');
      await user.click(screen.getByRole('button', { name: /submit/i }));

      expect(logSpy).toHaveBeenNthCalledWith(1, 'jane@example.com');
      expect(logSpy).toHaveBeenNthCalledWith(2, 'secure-password');
      expect(alertSpy).toHaveBeenCalledWith('Successful login');

      logSpy.mockRestore();
      alertSpy.mockRestore();
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

    it('reflects typed values in the controlled inputs', async () => {
      const user = userEvent.setup();
      render(<Register />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(nameInput, 'JohnDoe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');

      expect(nameInput).toHaveValue('JohnDoe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('logs the form data on submit', async () => {
      const user = userEvent.setup();
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

      render(<Register />);
      await user.type(screen.getByLabelText(/name/i), 'JohnDoe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /register/i }));

      expect(logSpy).toHaveBeenCalledWith('Register Attempt:', {
        name: 'JohnDoe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');

      logSpy.mockRestore();
    });
  });

  describe('ResetPassword Component', () => {
    it('renders all reset password fields', () => {
      render(<ResetPassword onResetPassword={vi.fn()} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/old password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
    });

    it('reflects typed values in the controlled inputs', async () => {
      const user = userEvent.setup();
      render(<ResetPassword onResetPassword={vi.fn()} />);

      const emailInput = screen.getByLabelText(/email/i);
      const oldPasswordInput = screen.getByLabelText(/old password/i);
      const newPasswordInput = screen.getByLabelText(/new password/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

      await user.type(emailInput, 'john@example.com');
      await user.type(oldPasswordInput, 'old-password');
      await user.type(newPasswordInput, 'new-password');
      await user.type(confirmPasswordInput, 'new-password');

      expect(emailInput).toHaveValue('john@example.com');
      expect(oldPasswordInput).toHaveValue('old-password');
      expect(newPasswordInput).toHaveValue('new-password');
      expect(confirmPasswordInput).toHaveValue('new-password');
    });

    it('shows an error and does not reset when passwords do not match', async () => {
      const onResetPassword = vi.fn();
      const user = userEvent.setup();

      render(<ResetPassword onResetPassword={onResetPassword} />);
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/old password/i), 'old-password');
      await user.type(screen.getByLabelText(/new password/i), 'new-password');
      await user.type(screen.getByLabelText(/confirm password/i), 'different-password');
      await user.click(screen.getByRole('button', { name: /reset password/i }));

      expect(screen.getByRole('alert')).toHaveTextContent(/must match/i);
      expect(onResetPassword).not.toHaveBeenCalled();
    });

    it('calls the callback and shows a success message when passwords match', async () => {
      const onResetPassword = vi.fn();
      const user = userEvent.setup();

      render(<ResetPassword onResetPassword={onResetPassword} />);
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/old password/i), 'old-password');
      await user.type(screen.getByLabelText(/new password/i), 'new-password');
      await user.type(screen.getByLabelText(/confirm password/i), 'new-password');
      await user.click(screen.getByRole('button', { name: /reset password/i }));

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