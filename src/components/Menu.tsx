import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu : React.FC = () => {
  return (
    <div style={{display:"flex",gap:"20px"}}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/add-user">Add new User</NavLink>
        <NavLink to="/add-project">Add new Project</NavLink>
    </div>
  )
}

export default Menu