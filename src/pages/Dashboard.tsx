import { useSelector } from "react-redux"
import { User } from "../types"

const Dashboard = () => {
const users = useSelector((state: { users: User[] }) => state.users)
  return (
    <div>
        <h1>Users List</h1>
        {users.map(user=>(
          <div style={{display:"flex",gap:"20px"}}>
            <h3>{user.name}</h3>
            <h4>{user.role}</h4>
          </div>
        ))}
    </div>
  )
}

export default Dashboard