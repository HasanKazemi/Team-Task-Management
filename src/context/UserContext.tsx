import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Task = {
  id: number;
  title: string;
};

type User = {
  id: number;
  name: string;
  role: string;
  position: string;
  tasks: Task[];
};

type UserContextType = {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'tasks'>) => void;
  addTaskToUser: (userId: number, taskTitle: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user: Omit<User, 'id' | 'tasks'>) => {
    const newUser: User = {
      id: Date.now(),
      tasks: [],
      ...user,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const addTaskToUser = (userId: number, taskTitle: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              tasks: [...user.tasks, { id: Date.now(), title: taskTitle }],
            }
          : user
      )
    );
  };

  return (
    <UserContext.Provider value={{ users, addUser, addTaskToUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used inside UserProvider');
  }
  return context;
};
