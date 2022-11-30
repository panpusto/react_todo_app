import {API_KEY, API_URL} from './constants';

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
export const getOperations = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            headers: {
                Authorization: API_KEY,
            }
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== 'function') {
            throw new Error('Operation data retrieve error!')
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Create operation
 * @param {string} id - task ID
 * @param {Object} operation - Complete object with all operation details
 * @param {string} operation.description - Operation description
 * @param {number} operation.timeSpent - Operation time spent
 * @param {function} successCallback - Function that saves incoming data
 */
export const createOperation = (id, operation, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(operation)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error && typeof successCallback !== 'function') {
                throw new Error('Operation data create error!')
            }
            successCallback(data.data)
        })
        .catch(err => console.log(err))
};

/**
 * Update operation
 * @param {string} id - operation id
 * @param {Object} operation - Complete object with operation details
 * @param {string} operation.description - Operation description
 * @param {number} operation.timeSpent - Time spent on operation
 * @param {function} successCallback - Function that saves incoming data
 */
export const updateOperation = (id, operation, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        headers: {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(operation)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error || typeof successCallback !== 'function') {
                throw new Error('Operation data update error!')
            }
            successCallback(data.data);
        })
        .catch(err => console.log(err))
};

/**
 * @param {string} id - Operation id
 * @param {function} successCallback - Function that runs after successfully deleting object
 */
export const deleteOperation = (id, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        headers: {
            Authorization: API_KEY,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error || typeof successCallback !== 'function') {
                throw new Error('Operation data deletion error!')
            }
            successCallback();
        })
        .catch(err => console.log(err))
};
