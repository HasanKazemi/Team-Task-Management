import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { AuthState } from './redux/slices/AuthSlice'

function App() {
  const {token,user} = useSelector((state:{auth: AuthState}) => state.auth)
  
  return (
    <>
      {token ? (
        <>
          <Menu user={user} />
          <Outlet />
        </>
      ):(
        <AuthPage />
      )}
    </>
  )
}

export default App
