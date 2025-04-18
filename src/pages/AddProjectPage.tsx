import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../redux/slices/ProjectSlice'
import { Project } from '../types'

const AddProjectPage:React.FC = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const projects = useSelector((state:{projects: Project[]}) => state.projects)

    const handleSubmit = (event:React.FormEvent)=>{
        event.preventDefault()
        const newProject:Project = {
            id: projects.length + 1,
            title,
            description,
        }
        dispatch(addProject(newProject))
        alert('project added successfully!');
        setTitle("")
        setDescription("")
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">project title</label>
                <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="description">description</label>
                <textarea name="description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <button type='submit'>add project</button>
        </form>
    </div>
  )
}

export default AddProjectPage