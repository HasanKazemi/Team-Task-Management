import React, { useState } from 'react';
import { User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slices/UserSlice';

const AddUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    role: 'member' as 'admin' | 'member',
  });

  const users: Array<User> = useSelector((state: { users: User[] }) => state.users)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const newUser : User = {
      id: users.length + 1,
      name: formData.name,
      password: formData.password,
      role: formData.role,
    }
    dispatch(userActions.addUser(newUser))
    alert('user added successfully!');
    setFormData({ name: '', password: '', role: 'member'});
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>add new user</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" value={formData.name} onChange={handleChange} required />
        <input name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default AddUserPage