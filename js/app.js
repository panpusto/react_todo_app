import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import AddTaskForm from "./components/AddTaskForm";
import Task from "./components/Task";
import {getTasks} from './api/tasks';
import {getOperations} from "./api/operations";

const App = () => {
    const [task, setTask] = useState([]);

    useEffect(() => {
        getTasks(setTask);
    }, []);

    const addNewTask = (task) => {
        setTask(prev => [...prev, task]);
        console.log(task);
    }

    const handleDeleteTask = (id) => {
        setTask(prev => prev.filter(task => task.id !== id))
    }

    return (
        <>
            <AddTaskForm onNewTask={addNewTask}/>
            {
                task.map(el => <Task key={el.id} data={el} onDeleteTask={handleDeleteTask}/>)
            }
        </>
    )
};

ReactDOM.render(<App/>, document.querySelector("#app"));