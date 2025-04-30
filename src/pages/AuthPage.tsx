import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slices/UserSlice';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/AuthSlice';
import { generateToken } from '../jwt/mockToken';
import styles from "../styles/authPage.module.css"

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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h1>
        
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
          </button>
        </form>

        <div className={styles.toggleContainer}>
          <p className={styles.toggleText}>
            {isLogin ? "Not a member yet?" : "Already have an account?"}
          </p>
          <button 
            className={styles.toggleButton}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

        {loading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage;