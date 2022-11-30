import React, {useState} from 'react';
import {createOperation} from "../api/operations";
import Operation from "./Operation";

const Operations = ({taskID, form, setForm, operations, setOperations, status}) => {
    const [operationDescription, setOperationDescription] = useState('');

    const newOperation = (e) => {
        e.preventDefault();
        const operation = {
            description: operationDescription,
            timeSpent: 0
        }

        createOperation(taskID, operation, (data) => {
            setOperations(prev => [data, ...prev]);
        });
        setForm(false);
        setOperationDescription('');
    }

    const deleteOperation = (id) => {
        setOperations(prev => prev.filter(operation => operation.id !== id));
    }

    return (
        <>
            {form && (
                <div className="card-body">
                <form onSubmit={newOperation}>
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Operation description"
                               value={operationDescription}
                               onChange={e => setOperationDescription(e.target.value)}
                        />

                        <div className="input-group-append">
                            <button className="btn btn-info">
                                Add
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            )}

            <ul className="list-group list-group-flush">
                {
                    operations.map(operation => (
                        <Operation description={operation.description}
                                   id={operation.id}
                                   timeSpent={operation.timeSpent}
                                   status={status}
                                   onRemoveOperation={deleteOperation}
                                   key={operation.id}
                        />
                    ))
                }
            </ul>
        </>
    );
};

export default Operations;