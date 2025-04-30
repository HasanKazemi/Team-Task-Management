import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Project, Task, User } from '../types';
import { addTask, deleteTask, updateTask } from '../redux/slices/TaskSlice';
import styles from '../styles/tasks.module.css'; 

const TasksPage:React.FC = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const params = useParams()
    const projects:Project[] = useSelector((state:{projects:Project[]}) => state.projects)
    const thisProject = projects.find((project)=> project.id === (Number(params.projectId)))

    const users:User[] = useSelector((state:{users:User[]}) => state.users)
    const tasks:Task[] = useSelector((state:{tasks:Task[]}) => state.tasks)
    const thisTasks = tasks?.filter((task:Task) => task.assignedProjectId === Number(params.projectId))

    const now = new Date()
    now.setMinutes(now.getMinutes()-now.getTimezoneOffset())
    const thisTime = now.toISOString().slice(0,16);

    const defaultFormData : Task = {
        id: 0,
        title: "",
        description: "",
        priority: "low" as "low" | "medium" | "high",
        status: "in-progress" as "in-progress" | "done",
        deadline: thisTime,
        assignedUserId: 1,
        assignedProjectId: Number(params.projectId),
    }

    const [formData, setFormData] = useState(defaultFormData)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newTask:Task = {
            id: tasks.length + 1,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
            deadline: formData.deadline,
            assignedUserId: Number(formData.assignedUserId),
            assignedProjectId: Number(params.projectId),
        }
        if (isEditMode) {
            dispatch(updateTask({...newTask, id:formData.id}))
        } else {
            dispatch(addTask(newTask))
            setFormData(defaultFormData)
        }
    }

    const handleEdit = (taskId:number) => {
        setIsEditMode(true)
        const task: Task | undefined = tasks.find((task: Task) => task.id === taskId)
        task && setFormData(task)
    }

  return (
    <div className={styles.container}>
        <h1 className={styles.header}>{thisProject?.title}</h1>
        <div className={styles.modeToggle}>
            <h2 className={styles.modeTitle}>{isEditMode ? "Edit Mode" : "Add Mode"}</h2>
            {isEditMode && <button className={styles.modeButton} onClick={() => {setIsEditMode(false);setFormData(defaultFormData)}}>Back to Add Mode</button>}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <input className={styles.input} type="text" name="title" id="title" placeholder='task title....' value={formData.title} onChange={handleChange} />
                <input className={styles.input} type="text" name="description" id="description" placeholder='task description....' value={formData.description} onChange={handleChange}/>
                <select className={styles.select} name="priority" id="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
                <select className={styles.select} name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="in-progress">in-progress</option>
                    <option value="done">done</option>
                </select>
                <input className={styles.input} type="datetime-local" name="deadline" id="deadline" value={formData.deadline} onChange={handleChange}/>
                <select className={styles.select} name="assignedUserId" id="assignedUserId" value={formData.assignedUserId} onChange={handleChange}>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <button className={styles.submitButton} type='submit'>{isEditMode ? "update task" : "add task"}</button>
        </form>
        {isEditMode || (
            <div className={styles.taskList}>
                {thisTasks?.map(task => (
                    <div key={task.id} className={styles.taskCard}>
                        <div className={styles.taskHeader}>
                            <h2 className={styles.taskTitle}>{task.title}</h2>
                        </div>
                        <p className={styles.taskDescription}>{task.description}</p>
                        <div className={styles.taskDetails}>
                            <div className={styles.taskDetail}>
                                <span className={styles.detailLabel}>Priority</span>
                                <span className={`${styles.priority} ${styles[`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`]}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className={styles.taskDetail}>
                                <span className={styles.detailLabel}>Status</span>
                                <span className={`${styles.status} ${styles[`status${task.status === 'in-progress' ? 'InProgress' : 'Done'}`]}`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className={styles.taskDetail}>
                                <span className={styles.detailLabel}>Deadline</span>
                                <span className={styles.detailValue}>{task.deadline}</span>
                            </div>
                        </div>
                        <div className={styles.taskActions}>
                            <button className={`${styles.actionButton} ${styles.editButton}`} onClick={()=>handleEdit(task.id)}>edit</button>
                            <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={()=>dispatch(deleteTask(task.id))}>delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TasksPage