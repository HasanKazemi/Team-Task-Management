import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/slices/AuthSlice'
import styles from '../styles/menu.module.css'

type Props = {
  user: string | null
}

const Menu: React.FC<Props> = ({user}) => {
  const dispatch = useDispatch()
  const username = user?.split('.')[1]
  const role = user?.split('.')[3]

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          Dashboard
        </NavLink>
        {(role === "admin") && (
          <>
            <NavLink 
              to="/add-user" 
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Add new User
            </NavLink>
            <NavLink 
              to="/add-project" 
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Add new Project
            </NavLink>
          </>
        )}
      </div>
      <div className={styles.user}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.userRole}>{role}</span>
        <button 
          className={styles.logoutButton}
          onClick={()=>dispatch(logout())}
        >
          log out
        </button>
      </div>
    </div>
  )
}

export default Menu