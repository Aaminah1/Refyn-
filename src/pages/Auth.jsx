import React, { useState } from 'react';
import './Auth.css';
import { Eye, EyeOff } from 'lucide-react';

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (mode === 'login') {
      if (!users[username] || users[username] !== password) {
        setError('Invalid credentials. Check username and password');
      } else {
        setError('');
        onLogin(username);
      }
    } else {
      if (username.length < 3) {
        setError('Username must be at least 3 characters long.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (users[username]) {
        setError('Username already exists.');
      } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        setAccountCreated(true);
        setError('');
        setMode('login');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setShowLoginPassword(false);
        setShowSignupPassword(false);
      }
    }
  };

  const renderPasswordField = (value, setter, placeholder, id, show, setShow) => (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setter(e.target.value)}
        style={{ paddingRight: '2.5rem', width: '100%', padding: '0.5rem' }}
        aria-label={placeholder}
        aria-required="true"
        required
        autoComplete={
          id === 'password'
            ? mode === 'login'
              ? 'current-password'
              : 'new-password'
            : 'new-password'
        }
      />
      <span
        onClick={() => setShow(prev => !prev)}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-pressed={show}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setShow(prev => !prev);
        }}
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  );

  return (
    <div className="auth-container" role="main" aria-labelledby="auth-heading">
      <h1 id="auth-heading">{mode === 'login' ? 'Login' : 'Sign Up'} to Refyn</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            const input = e.target.value;
            const formatted = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            setUsername(formatted);
          }}
          required
          aria-required="true"
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        {renderPasswordField(
          password,
          setPassword,
          'Password',
          'password',
          mode === 'login' ? showLoginPassword : showSignupPassword,
          mode === 'login' ? setShowLoginPassword : setShowSignupPassword
        )}

        {mode === 'signup' && (
          <>
            <label htmlFor="confirmPassword">Confirm Password</label>
            {renderPasswordField(
              confirmPassword,
              setConfirmPassword,
              'Confirm Password',
              'confirmPassword',
              showSignupPassword,
              setShowSignupPassword
            )}
          </>
        )}

        <button type="submit" aria-label={mode === 'login' ? 'Submit login form' : 'Submit signup form'}>
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <div role="alert" aria-live="assertive">
        {error && <p className="error-message">{error}</p>}
        {accountCreated && <p className="success-message">Account created! You can now log in.</p>}
      </div>

      <div className="auth-toggle">
        {mode === 'login' ? (
          <>
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
                setAccountCreated(false);
                setShowLoginPassword(false);
                setShowSignupPassword(false);
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setAccountCreated(false);
                setShowLoginPassword(false);
                setShowSignupPassword(false);
              }}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
