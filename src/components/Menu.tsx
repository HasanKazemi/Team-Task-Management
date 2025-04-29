import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/slices/AuthSlice'
import '../styles/menu.css' 

type Props = {
  user: string | null
}

const Menu : React.FC<Props> = ({user}) => {
  const dispatch = useDispatch()
  const username = user?.split('.')[1]
  const role = user?.split('.')[3]

  return (
    <div className='container'>
      <div>
        <NavLink to="/">Dashboard</NavLink>
        {(role === "admin") && (
          <>
            <NavLink to="/add-user">Add new User</NavLink>
            <NavLink to="/add-project">Add new Project</NavLink>
          </>
        )}
      </div>
      <div>
        <span>{username}</span>
        <span>{role}</span>
        <button onClick={()=>dispatch(logout())}>log out</button>
      </div>
    </div>
  )
}

export default Menu