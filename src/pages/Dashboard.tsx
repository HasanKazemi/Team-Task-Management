import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Filters, Project, Task, User } from "../types"
import { Link } from "react-router-dom"
import { selectFilteredTasks } from "../redux/selectors/selectFilteredTasks"
import styles from "../styles/dashboard.module.css"

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
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Users List</h2>
        <div className={styles.userList}>
          {users.map(user => (
            <div key={user.id} className={styles.userCard}>
              <h3 className={styles.userName}>{user.name}</h3>
              <span className={styles.userRole}>{user.role}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Project List</h2>
        <div className={styles.projectList}>
          {projects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <p className={styles.projectTitle}>{project.title}</p>
              <p className={styles.projectDescription}>{project.description}</p>
              <Link to={`/project/${project.id}`} className={styles.manageLink}>
                Manage Tasks
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.section}>
        <div className={styles.filterSection}>
          <h4 className={styles.filterTitle}>Advanced Filter</h4>
          <div className={styles.filterGroup}>
            <div>
              <label htmlFor="searchTerm" className={styles.filterLabel}>Search by title</label>
              <input 
                type="text" 
                name="searchTerm" 
                id="searchTerm" 
                className={styles.filterInput}
                placeholder="Task title..." 
                value={filters.searchTerm} 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label htmlFor="searchStatus" className={styles.filterLabel}>Filter by status</label>
              <select 
                name="searchStatus" 
                id="searchStatus" 
                className={styles.filterSelect}
                value={filters.searchStatus} 
                onChange={handleChange}
              >
                <option value="all">All</option>
                <option value="in-progress">In-progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="searchPriority" className={styles.filterLabel}>Filter by priority</label>
              <select 
                name="searchPriority" 
                id="searchPriority" 
                className={styles.filterSelect}
                value={filters.searchPriority} 
                onChange={handleChange}
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="searchAssignedUserId" className={styles.filterLabel}>Responsible person</label>
              <select 
                name="searchAssignedUserId" 
                id="searchAssignedUserId" 
                className={styles.filterSelect}
                value={filters.searchAssignedUserId} 
                onChange={handleChange}
              >
                <option value="0">All</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <h2 className={styles.sectionTitle}>Tasks List</h2>
        <div className={styles.taskList}>
          {filteredTasks?.map(task => (
            <div key={task.id} className={styles.taskCard}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Description:</span>
                <span className={styles.taskValue}>{task.description}</span>
              </div>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Status:</span>
                <span className={styles.taskStatus}>{task.status}</span>
              </div>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Priority:</span>
                <span className={`${styles.taskPriority} ${
                  task.priority === 'high' ? styles.priorityHigh :
                  task.priority === 'medium' ? styles.priorityMedium :
                  styles.priorityLow
                }`}>
                  {task.priority}
                </span>
              </div>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Deadline:</span>
                <span className={styles.taskValue}>{task.deadline}</span>
              </div>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Project:</span>
                <span className={styles.taskValue}>
                  {projects.find(project => project.id === task.assignedProjectId)?.title}
                </span>
              </div>
              
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Assigned to:</span>
                <span className={styles.taskValue}>
                  {users.find(user => user.id === task.assignedUserId)?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard