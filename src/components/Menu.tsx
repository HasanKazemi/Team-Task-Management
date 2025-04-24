import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/slices/AuthSlice'

const Menu : React.FC<Props> = ({user}) => {
  const dispatch = useDispatch()
  const username = user?.split('.')[1]
  const role = user?.split('.')[3]
  
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{display:"flex",gap:"20px"}}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/add-user">Add new User</NavLink>
        <NavLink to="/add-project">Add new Project</NavLink>
      </div>
      <div style={{display:"flex",gap:"20px"}}>
        <span>{username}</span>
        <span>{role}</span>
        <button onClick={()=>dispatch(logout())}>log out</button>
      </div>
    </div>
  )
}

export default Menu