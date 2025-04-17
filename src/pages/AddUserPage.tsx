import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

const AddUserPage: React.FC = () => {
  const { addUser } = useUserContext();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    position: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(formData);
    alert('user added successfully!');
    setFormData({ name: '', role: '', position: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>add new user</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" value={formData.name} onChange={handleChange} required /> 
        <input name="position" placeholder="position" value={formData.position} onChange={handleChange} required />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddUserPage;
