import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slices/UserSlice';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/AuthSlice';
import { generateToken } from '../jwt/mockToken';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const users: Array<User> = useSelector((state: { users: User[] }) => state.users)

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

  const handleSignup = () => {
    const newUser : User = {
        id: users.length + 1,
        name: username,
        password: password,
        role: "member",
    }
    dispatch(userActions.addUser(newUser))
    const token = generateToken(newUser)
    dispatch(login(token))
  }

  const handleLogin = () => {
    const detectedUser = users?.find(user => user.name === username && user.password === password)
    if (!detectedUser) {
      return setError("user not found")
    }
    const token = generateToken(detectedUser)
    dispatch(login(token))
    navigate("/")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');

    isLogin ? handleLogin() : handleSignup();

    setTimeout(() => {
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
        <button type="submit" disabled={loading}>{isLogin? "log in" : "sign up"}</button>
      </form>
      {isLogin ? (
            <div style={{display:"flex"}}>
                <p>Not a member yet?</p>
                <button onClick={() => setIsLogin(false)}>click to sign up</button>
            </div>
        ):(
            <div style={{display:"flex"}}>
                <p>Allready have an account?</p>
                <button onClick={() => setIsLogin(true)}>click to log in</button>
            </div>
        )
      }
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthPage;