import React, { useState } from 'react';
import { User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slices/UserSlice';
import styles from '../styles/addUser.module.css';

const AddUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    role: 'member' as 'admin' | 'member',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const users: Array<User> = useSelector((state: { users: User[] }) => state.users);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = {
      id: users.length + 1,
      name: formData.name,
      password: formData.password,
      role: formData.role,
    };
    dispatch(userActions.addUser(newUser));
    setShowSuccess(true);
    setFormData({ name: '', password: '', role: 'member' });
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add New User</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <select
              className={styles.select}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Add User
          </button>
        </form>
        
        {showSuccess && (
          <div className={styles.successMessage}>User added successfully!</div>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;