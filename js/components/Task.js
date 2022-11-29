import React, {useEffect, useState} from 'react';
import {getOperations} from "../api/operations";
import {deleteTask, updateTask} from "../api/tasks";

const Task = ({data, onDeleteTask}) => {
    const [status, setStatus] = useState(data.status);
    const [operations, setOperations] = useState([]);
    const [operationDisplay, setOperationDisplay] = useState(false);

    useEffect(() => {
        getOperations(data.id, setOperations)
    }, [])

    const handleFinishTask = () => {
        const task = {
            title: data.title,
            description: data.description,
            status: 'closed'
        }
        updateTask(data.id, task, () => {
            setStatus('closed')
        });
    }

    const toggleOperationDisplay = () => {
        setOperationDisplay(prevState => !prevState);
    }

    const handleDeleteTask = () => {
        deleteTask(data.id, () => {
            onDeleteTask(data.id);
        });
    }

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{data.title}</h5>
                    <h6 className="card-subtitle text-muted">{data.description}</h6>
                </div>
                <div>
                    {data.status === 'open' && (
                        <>
                            <button className="btn btn-info btn-sm mr-2" onClick={toggleOperationDisplay}>
                                Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                            <button className="btn btn-dark btn-sm" onClick={handleFinishTask}>
                                Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    )}
                    {operations.length === 0 &&
                        <button className="btn btn-outline-danger btn-sm ml-2" onClick={handleDeleteTask}>
                            <i className="fas fa-trash false"></i>
                        </button>}
                </div>
            </div>
        </section>
    );
};

export default Task;