import { useSelector } from "react-redux"
import { Project, User } from "../types"
import { Link } from "react-router-dom"

const Dashboard = () => {
const users = useSelector((state: { users: User[] }) => state.users)
const projects = useSelector((state: { projects: Project[] }) => state.projects)

  return (
    <div>
        <h1>Users List</h1>
        {users.map(user=>(
          <div style={{display:"flex",gap:"20px"}}>
            <h3>{user.name}</h3>
            <h4>{user.role}</h4>
          </div>
        ))}
        <div style={{marginTop: "50px"}}>
          {projects.map(project =>(
            <div style={{display:"flex",gap:"20px"}}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <Link to={`/project/${project.id}`}>manage tasks</Link>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Dashboard