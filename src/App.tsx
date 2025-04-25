import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { AuthState } from './redux/slices/AuthSlice'
import MemberDashboard from './pages/public/MemberDashboard'

function App() {
  const {token,user} = useSelector((state:{auth: AuthState}) => state.auth)
  const userRole = user?.split(".")[3]

  return (
    <>
      {token ? (
        <>
          <Menu user={user} />
          {userRole === "admin" ? (
            <Outlet />
          ): (
            <MemberDashboard />
          )}
        </>
      ):(
        <AuthPage />
      )}
    </>
  )
}

export default App
