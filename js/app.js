import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import AddTaskForm from "./components/AddTaskForm";
import TaskDiv from "./components/TaskDiv";
import {getTasks} from './api/tasks';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(setTasks);
    }, []);

    return (
        <>
            <AddTaskForm setTasks={setTasks}/>
            {
                tasks.map(el => <TaskDiv key={el.id} data={el}/>)
            }
        </>
    )
};

ReactDOM.render(<App/>, document.querySelector("#app"));