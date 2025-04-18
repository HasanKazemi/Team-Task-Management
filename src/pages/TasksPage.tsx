import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Project, Task, User } from '../types';
import { addTask, deleteTask, updateTask } from '../redux/slices/TaskSlice';

const TasksPage:React.FC = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const params = useParams()
    const projects:Project[] = useSelector((state:{projects:Project[]}) => state.projects)
    const thisProject = projects.find((project)=> project.id === (Number(params.projectId)))

    const users:User[] = useSelector((state:{users:User[]}) => state.users)
    const tasks:Task[] = useSelector((state:{tasks:Task[]}) => state.tasks)
    const thisTasks = tasks?.filter((task:Task) => task.assignedProjectId === Number(params.projectId))

    const defaultFormData : Task = {
        id: 0,
        title: "",
        description: "",
        priority: "low" as "low" | "medium" | "high",
        status: "in-progress" as "in-progress" | "done",
        deadline: "",
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
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
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
    <div>
        <h1>{thisProject?.title}</h1>
        <div style={{display: "flex"}}>
            <h2>{isEditMode ? "Edit Mode" : "Add Mode"}</h2>
            {isEditMode && <button onClick={() => {setIsEditMode(false);setFormData(defaultFormData)}}>Back to Add Mode</button>}
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />
            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange}/>
            <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
            </select>
            <input type="date" name="deadline" id="deadline" value={formData.deadline} onChange={handleChange}/>
            <select name="assignedUserId" id="assignedUserId" value={formData.assignedUserId} onChange={handleChange}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <button type='submit'>{isEditMode ? "update task" : "add task"}</button>
        </form>
        {isEditMode || (
            <div style={{marginTop: "50px"}}>
                {thisTasks?.map(task => (
                    <div key={task.id} style={{display: "flex",gap:"10px",marginBottom:"20px"}}>
                        <h2>{task.title}</h2>
                        <h3>{task.description}</h3>
                        <p>{task.priority}</p>
                        <p>{task.status}</p>
                        <p>{task.deadline}</p>
                        <button onClick={()=>handleEdit(task.id)}>edit</button>
                        <button onClick={()=>dispatch(deleteTask(task.id))}>delete</button>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TasksPage