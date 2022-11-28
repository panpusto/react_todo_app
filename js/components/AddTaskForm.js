import React, {useState} from 'react';
import {API_URL, API_KEY} from '../api/constants';
import {getTasks} from "../api/tasks";

const AddTaskForm = ({setTasks}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('https://todo-api.coderslab.pl/api/tasks', {
            method: 'POST',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                status: "open"
            })
        })
            .then(response => response.json())
            .then(data => getTasks(setTasks))
            .catch(err => console.log(err))
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               placeholder="Title"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="description"
                               placeholder="Description"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <button className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskForm;