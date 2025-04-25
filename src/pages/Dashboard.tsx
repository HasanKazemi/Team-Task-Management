import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Filters, Project, Task, User } from "../types"
import { Link } from "react-router-dom"
import { selectFilteredTasks } from "../redux/selectors/selectFilteredTasks"

const Dashboard: React.FC = () => {

  const users = useSelector((state: { users: User[] }) => state.users)
  const projects = useSelector((state: { projects: Project[] }) => state.projects)

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    searchStatus: "all",
    searchPriority: "all",
    searchAssignedUserId: 0,
  })

  const filteredTasks = useSelector((state: { tasks: Task[] }) => selectFilteredTasks(state,filters))

  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name,value} = event.target
    if (name == "searchAssignedUserId") {
      return setFilters(prev => ({ ...prev, [name]: Number(value) }));
    }
    setFilters(prev => ({ ...prev, [name]: value }));  
  }

  return (
    <div>
        <h1>Users List</h1>
        {users.map(user=>(
          <div key={user.id} style={{display:"flex",gap:"20px"}}>
            <h3>{user.name}</h3>
            <h4>{user.role}</h4>
          </div>
        ))}
        <div style={{marginTop: "50px"}}>
          <h2>Project List</h2>
          {projects.map(project =>(
            <div key={project.id} style={{display:"flex",gap:"20px"}}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <Link to={`/project/${project.id}`}>manage tasks</Link>
            </div>
          ))}
        </div>
        <div style={{marginTop:"100px"}}>
          <h4>Advance Filter</h4>
          <label htmlFor="searchTerm">search by title</label>
          <input type="text" name="searchTerm" id="searchTerm" placeholder="task title..." value={filters.searchTerm} onChange={handleChange} />
          <label htmlFor="searchStatus">filter by task's status</label>
          <select name="searchStatus" id="searchStatus" value={filters.searchStatus} onChange={handleChange}>
            <option value="all">all</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
          <label htmlFor="searchPriority">filter by task's priority</label>
          <select name="searchPriority" id="searchPriority" value={filters.searchPriority} onChange={handleChange}>
            <option value="all">--</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <label htmlFor="searchAssignedUserId">responsible person</label>
          <select name="searchAssignedUserId" id="searchAssignedUserId" value={filters.searchAssignedUserId} onChange={handleChange}>
            <option value="">--</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <h2>Tasks List</h2>
          {filteredTasks?.map(task => (
            <div key={task.id} style={{display:"flex", gap:"20px"}}>
              <p>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <p>{task.priority}</p>
              <p>{task.deadline}</p>
              <p>{projects.find(project=>project.id===task.assignedProjectId)?.title}</p>
              <p>{users.find(user=>user.id ===task.assignedUserId)?.name}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Dashboard