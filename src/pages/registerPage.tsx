import React, { useState } from 'react';

type Props = {
  onRegister: () => void;
};

const RegisterPage: React.FC<Props> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return false;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return false;
    }
    return true;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('role', 'user');
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('role', 'admin');
    } else{
        localStorage.setItem('role', 'user');
    }

    setTimeout(() => {
      onRegister();
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>Register</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
