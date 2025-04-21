import React, { useState } from 'react';
import LoginForm from './pages/loginForm';
import TasksPage from './pages/TasksPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <TasksPage />
      ) : (
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  );
};

export default App;
