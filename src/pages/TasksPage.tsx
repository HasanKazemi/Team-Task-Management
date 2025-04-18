import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Project } from '../types';

const TasksPage:React.FC = () => {
    const params = useParams()
    const projects:Project[] = useSelector((state:{projects:Project[]}) => state.projects)

    const thisProject = projects.find((project)=> project.id === (Number(params.projectId)))

  return (
    <div>
        <h1>{thisProject?.title}</h1>
    </div>
  )
}

export default TasksPage