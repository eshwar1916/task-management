import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import ReactParticles from '../Particlejs';
const columnsData = [
    { id: 'todo', title: 'TODO' },
    { id: 'inProgress', title: 'IN-PROGRESS' },
    { id: 'completed', title: 'COMPLETED' }
];

const Dashboard = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        completed: []
    });

    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const cachedTasks = localStorage.getItem('tasks');
        if (cachedTasks) {
            setTasks(JSON.parse(cachedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks(prev => ({
                ...prev,
                todo: [...prev.todo, newTask]
            }));
            setNewTask(''); // Reset input field
        }
    };

    const handleMoveTask = (task, sourceColumnId, destinationColumnId) => {
        const sourceTasks = tasks[sourceColumnId].filter(t => t !== task);
        const destinationTasks = [...tasks[destinationColumnId], task];

        setTasks(prev => ({
            ...prev,
            [sourceColumnId]: sourceTasks,
            [destinationColumnId]: destinationTasks
        }));
    };

    const handleDeleteTask = (task, columnId) => {
        const updatedTasks = tasks[columnId].filter(t => t !== task);
        setTasks(prev => ({
            ...prev,
            [columnId]: updatedTasks
        }));
    };

    const renderColumns = () => {
        return columnsData.map(column => (
            <div className="task-column" key={column.id}>
                <h2>{column.title}</h2>
                <ul>
                    {tasks[column.id].map((task) => (
                        <li className="task-item" key={task}>
                            <span>{task}</span>
                            <div>
                                {column.id !== 'completed' && (
                                    <button
                                        onClick={() => handleMoveTask(task, column.id, column.id === 'todo' ? 'inProgress' : 'completed')}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                )}
                                <button onClick={() => handleDeleteTask(task, column.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <><ReactParticles /><div className="mainPage">

            <section className="hero" id="home">
                <div className="hero-content">
                    <div className="content-box">
                        <div className="task-input">
                            <input
                                type="text"
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                placeholder="Add a new task" />
                            <button onClick={handleAddTask}>Add Task</button>
                        </div>
                        <div className="task-board">
                            {renderColumns()}
                        </div>
                    </div>
                </div>
            </section>
        </div></>
    );
};

export default Dashboard;
