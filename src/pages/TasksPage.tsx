import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Project, Task, User } from '../types';
import { addTask } from '../redux/slices/TaskSlice';
import CustomInput from '../components/customInput';
import CustomSelect from '../components/customSelect';

const TasksPage: React.FC = () => {
  const params = useParams();
  const projects: Project[] = useSelector((state: { projects: Project[] }) => state.projects);
  const thisProject = projects.find((project) => project.id === Number(params.projectId));

  const users: User[] = useSelector((state: { users: User[] }) => state.users);
  const tasks: Task[] = useSelector((state: { tasks: Task[] }) => state.tasks);

  const defaultFormData: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'low' as 'low' | 'medium' | 'high',
    status: 'in-progress' as 'in-progress' | 'done',
    deadline: '',
    assingedUserId: 1,
    assingedProjectId: Number(params.projectId),
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: tasks.length + 1,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      deadline: formData.deadline,
      assingedUserId: Number(formData.assingedUserId),
      assingedProjectId: Number(params.projectId),
    };
    dispatch(addTask(newTask));
    setFormData(defaultFormData);
  };

  return (
    <div>
      <h1>{thisProject?.title}</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput type="text" name="title" id="title" onChange={handleChange} />
        <CustomInput type="text" name="description" id="description" onChange={handleChange} />
        <CustomSelect
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
        <CustomSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
        <CustomInput type="date" name="deadline" id="deadline" onChange={handleChange} />
        <CustomSelect
          name="assingedUserId"
          value={formData.assingedUserId}
          onChange={handleChange}
          options={users.map((user) => ({
            value: user.id.toString(),
            label: user.name,
          }))}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TasksPage;