import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import AddForm from "./components/AddForm";
import Task from "./components/Task";
import {getTasks} from './api/tasks';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(setTasks);
    }, []);

    return (
        <>
            <AddForm setTasks={setTasks}/>
            {
                tasks.map(el => <Task key={el.id} data={el}/>)
            }
        </>
    )
};

ReactDOM.render(<App/>, document.querySelector("#app"));