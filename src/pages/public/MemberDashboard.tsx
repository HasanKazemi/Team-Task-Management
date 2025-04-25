import React from 'react'
import { useSelector } from 'react-redux'
import { Project, Task } from '../../types'
import { AuthState } from '../../redux/slices/AuthSlice'

const MemberDashboard: React.FC = () => {
  const {user} = useSelector((state:{auth: AuthState}) => state.auth)
  const userId = user?.split(".")[0]

  const projects = useSelector((state: { projects: Project[] }) => state.projects)

  const allTasks = useSelector((state: { tasks: Task[] }) => state.tasks)
  const myTasks = allTasks.filter(task => task.assignedUserId === Number(userId))

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <h2>Project List</h2>
        {projects.map(project => (
          <div key={project.id} style={{ display: "flex", gap: "20px" }}>
            <p>{project.title}</p>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "50px" }}>
        <h2>My Tasks</h2>
        {
          myTasks.map(task => (
            <div key={task.id} style={{ display: "flex", gap: "20px" }}>
              <p>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <p>{task.priority}</p>
              <p>{task.deadline}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MemberDashboard