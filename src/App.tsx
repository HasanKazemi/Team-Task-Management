import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { Auth } from './redux/slices/AuthSlice'


function App() {
  const isAuthenticated = useSelector((state:{auth:Auth}) =>state.auth.isAuthenticated)
  return (
    <>
      <Menu/>
      {!isAuthenticated ? (<AuthPage />)
      :
      (<Outlet/>)
      }
    </>
  )
}

export default App
