import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../redux/slices/ProjectSlice'
import { Project } from '../types'
import styles from '../styles/addProject.module.css'

const AddProjectPage: React.FC = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const dispatch = useDispatch()
    const projects = useSelector((state:{projects: Project[]}) => state.projects)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const newProject: Project = {
            id: projects.length + 1,
            title,
            description,
        }
        dispatch(addProject(newProject))
        setShowSuccess(true)
        setTitle("")
        setDescription("")
        
        setTimeout(() => {
            setShowSuccess(false)
        }, 3000)
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Add New Project</h1>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title" className={styles.label}>Project Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            className={styles.input}
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            className={styles.textarea}
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type='submit' className={styles.submitButton}>
                        Add Project
                    </button>
                </form>
                
                {showSuccess && (
                    <div className={styles.successMessage}>Project added successfully!</div>
                )}
            </div>
        </div>
    )
}

export default AddProjectPage