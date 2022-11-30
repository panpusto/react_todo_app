import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import {getTasks} from './api/tasks';

const App = () => {
    const [task, setTask] = useState([]);

    useEffect(() => {
        getTasks(setTask);
    }, []);

    const addNewTask = (task) => {
        setTask(prev => [task, ...prev]);
    }

    const handleDeleteTask = (id) => {
        setTask(prev => prev.filter(task => task.id !== id))
    }

    return (
        <>
            <NewTask onNewTask={addNewTask}/>
            {
                task.map(el => <Task key={el.id} data={el} onDeleteTask={handleDeleteTask}/>)
            }
        </>
    )
};

ReactDOM.render(<App/>, document.querySelector("#app"));