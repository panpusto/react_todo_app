import React, {useState} from 'react';
import {deleteOperation, updateOperation} from "../api/operations";

const Operation = ({description, id, timeSpent: spentTime, status, onRemoveOperation}) => {
    const [timeSpentForm, setTimeSpentForm] = useState(false);
    const [timeSpent, setTimeSpent] = useState(spentTime);
    const [timeSpentInput, setTimeSpentInput] = useState('');

    const timeHours = Math.floor(timeSpent / 60);
    const timeMinutes = timeSpent % 60

    const handleAddTime = (e) => {
        e.preventDefault();

        const operation = {
            description,
            timeSpent: timeSpent + parseInt(timeSpentInput),
        };

        if (timeSpentInput > 0) {
            updateOperation(id, operation, data => {
                setTimeSpent(data.timeSpent);
                setTimeSpentForm(false);
                setTimeSpentInput('');
            })
        } else {
            return null
        }
        
    };

    const handleDeleteOperation = () => {
        deleteOperation(id, () => {
            onRemoveOperation(id);
        });
    }

    const handleCloseTimeForm = (e) => {
        e.preventDefault();
        setTimeSpentForm(false);
    }

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    {description}
                    {timeSpent > 0 && (
                        <span className="badge badge-success badge-pill ml-2">
                            {timeHours}h {timeMinutes}min
                        </span>
                    )}
                </div>

                {timeSpentForm && (
                    <form onSubmit={handleAddTime}>
                    <div className="input-group input-group-sm">
                        <input type="number"
                               className="form-control"
                               placeholder="Spent time in minutes"
                               style={{width: '12rem'}}
                               value={timeSpentInput}
                               onChange={e => setTimeSpentInput(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success"><i className="fas fa-save"></i></button>
                            <button className="btn btn-outline-dark"
                                    onClick={handleCloseTimeForm}><i className="fas fa-times false"></i></button>
                        </div>
                    </div>
                </form>
                )}

                {!timeSpentForm && (
                    <div>
                            {status === 'open' && (
                                <button className="btn btn-outline-success btn-sm mr-2"
                                        onClick={() => setTimeSpentForm(true)}
                                >
                                    Add time
                                    <i className="fas fa-clock ml-1"></i>
                                </button>
                            )}
                        <button className="btn btn-outline-danger btn-sm"
                                onClick={handleDeleteOperation}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                )}
            </li>

        </>
    );
};

export default Operation;