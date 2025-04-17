// 🌟 App.tsx
import React from 'react';
import AddUserPage from './pages/AddUserPage';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <div>
        <AddUserPage />
        <hr />
        <Dashboard />
      </div>
    </UserProvider>
  );
};

export default App;
