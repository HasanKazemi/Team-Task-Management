import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import AddUserPage from './pages/AddUserPage.tsx'
import AddProjectPage from './pages/AddProjectPage.tsx'
import TasksPage from './pages/TasksPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: 'add-user',
        element: <AddUserPage />,
      },
      {
        path: 'add-project',
        element: <AddProjectPage />,
      },
      {
        path: 'project/:projectId',
        element: <TasksPage />,
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
