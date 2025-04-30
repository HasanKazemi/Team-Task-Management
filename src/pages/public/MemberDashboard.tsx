import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Project, Task } from '../../types'
import { AuthState } from '../../redux/slices/AuthSlice'
import { doneTask } from '../../redux/slices/TaskSlice'
import styles from  '../../styles/memberDashboard.module.css'

const MemberDashboard: React.FC = () => {
  const {user} = useSelector((state:{auth: AuthState}) => state.auth)
  const userId = user?.split(".")[0]

  const projects = useSelector((state: { projects: Project[] }) => state.projects)

  const allTasks = useSelector((state: { tasks: Task[] }) => state.tasks)
  const myTasks = allTasks.filter(task => task.assignedUserId === Number(userId))

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <div className={styles.projectsSection}>
        <h2 className={styles.sectionTitle}>Project List</h2>
        {projects.map(project => (
          <div key={project.id} className={styles.projectCard}>
            <p className={styles.projectTitle}>{project.title}</p>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.tasksSection} style={{ marginTop: "100px" }}>
        <h2 className={styles.sectionTitle}>My Tasks</h2>
        <div className={styles.taskList}>
          {myTasks.map(task => (
            <div key={task.id} className={styles.taskCard}>
              <p className={styles.taskTitle}>{task.title}</p>
              <div className={styles.taskDetail}>
                <span className={styles.taskLabel}>Description:</span>
                <span className={styles.taskValue}>{task.description}</span>
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
                <span className={styles.taskLabel}>Status:</span>
                <span className={styles.taskStatus}>{task.status}</span>
              </div>
              <button 
                className={styles.doneButton}
                onClick={()=>dispatch(doneTask(task.id))}
              >
                done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard