import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Project, Task, User } from '../types';
import { addTask } from '../redux/slices/TaskSlice';

const TasksPage:React.FC = () => {
    const params = useParams()
    const projects:Project[] = useSelector((state:{projects:Project[]}) => state.projects)
    const thisProject = projects.find((project)=> project.id === (Number(params.projectId)))

    const users:User[] = useSelector((state:{users:User[]}) => state.users)
    const tasks:Task[] = useSelector((state:{tasks:Task[]}) => state.tasks)

    const defaultFormData : Task = {
        id: 0,
        title: "",
        description: "",
        priority: "low" as "low" | "medium" | "high",
        status: "in-progress" as "in-progress" | "done",
        deadline: "",
        assingedUserId: 1,
        assingedProjectId: Number(params.projectId),
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
            assingedUserId: Number(formData.assingedUserId),
            assingedProjectId: Number(params.projectId),
        }
        dispatch(addTask(newTask))
        setFormData(defaultFormData)
    }

  return (
    <div>
        <h1>{thisProject?.title}</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" id="title" onChange={handleChange} />
            <input type="text" name="description" id="description"  onChange={handleChange}/>
            <select name="priority" id="priority" defaultValue="low" onChange={handleChange}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <select name="status" id="status" defaultValue="in-progress" onChange={handleChange}>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
            </select>
            <input type="date" name="deadline" id="deadline" onChange={handleChange}/>
            <select name="assingedUserId" id="assingedUserId" defaultValue={1} onChange={handleChange}>
                {users.map(user => (
                    <option value={user.id}>{user.name}</option>
                ))}
            </select>
            <button type='submit'>add task</button>
        </form>
    </div>
  )
}

export default TasksPage