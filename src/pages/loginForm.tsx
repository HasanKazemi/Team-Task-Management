import React, { useState } from 'react';

type Props = {
  onLogin: () => void;
};

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const valiadateForm = () => {
    if (!username || !password ) {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!valiadateForm()) return;

    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        localStorage.setItem('role', 'admin');
        onLogin();
      } else {
        const
          storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password'); 
        
        if (username === storedUsername && password === storedPassword) {
          localStorage.setItem('role' , 'user');
          onLogin();
        } else {
          setError('Invalid username or password');

        }
        }
      }
      
  , 1000);
  };

  return (
    <div>
    <form onSubmit={handleLogin}>
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
      <button type="submit" disabled={loading}>submit</button>
      {loading && <p>loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </div>
  );
};

export default LoginPage;