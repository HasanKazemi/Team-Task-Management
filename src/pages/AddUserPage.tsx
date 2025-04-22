import React, { useState } from 'react';
import { User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/slices/UserSlice';
import CustomInput from '../components/customInput';
import CustomSelect from '../components/customSelect';


const AddUserPage: React.FC = () => {

  const role = localStorage.getItem('role');
  if (role !== 'admin') {
      return <p> Acces denied </p>;
  }
  
  const [formData, setFormData] = useState({
    name: '',
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
      role: formData.role,
    }
    dispatch(userActions.addUser(newUser))
    alert('user added successfully!');
    setFormData({ name: '', role: 'member'});
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>add new user</h2>
      <form onSubmit={handleSubmit}>
        <CustomInput name="name" placeholder="name" value={formData.name} onChange={handleChange} required />
        <CustomSelect name="role" defaultValue={"member"} value={formData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </CustomSelect>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default AddUserPage