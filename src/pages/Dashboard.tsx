// 🌟 Dashboard.tsx
import React from 'react';
import { useUserContext } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { users } = useUserContext();

  return (
    <div style={{ padding: '20px' }}>
      <h2>user list</h2>
      {users.length === 0 ? (
        <p>no users added yet</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> position: {user.position}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
