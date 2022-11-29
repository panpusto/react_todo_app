import {API_KEY, API_URL} from './constants';
import React from 'react';

/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */

 export const getTasks = async (successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                Authorization: API_KEY,
            }
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== 'function') {
            throw new Error('Task data retrieving error!');
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};

 /**
  * Create new task
  * @param {Object} task - Complete object with task details
  * @param {string} task.title - Task title
  * @param {string} task.description - Task description
  * @param {string} task.status - Task status (open/closed)
  * @param {function} successCallback - Function that saves incoming data
  */
 export const createTask = (task, successCallback) => {
     fetch(`${API_URL}/tasks`, {
         headers: {
             Authorization: API_KEY,
             'Content-Type': 'application/json',
         },
         method: 'POST',
         body: JSON.stringify(task)
     })
         .then(response => response.json())
         .then(data => {
             if (data.error || typeof successCallback !== 'function') {
                 throw new Error('Task data creating error!')
             }
             successCallback(data.data);
         })
         .catch(err => console.log(err))
 };

 /**
  * Update task
  * @param {string} id - task ID
  * @param {Object} task - Complete object with task details
  * @param {string} task.title - Task title
  * @param {string} task.description - Task description
  * @param {string} task.status = Task status (open/closed)
  * @param {function} successCallback - Function that saves incoming data
  */
 export const updateTask = (id, task, successCallback) => {
     fetch(`${API_URL}/tasks/${id}`, {
         headers: {
             Authorization: API_KEY,
             'Content-Type': 'application/json',
         },
         method: 'PUT',
         body: JSON.stringify(task)
     })
         .then(response => response.json())
         .then(data => {
             if (data.error || typeof successCallback !== 'function') {
                 throw new Error('Task data updating error!')
             }
             successCallback(data.data)
         })
         .catch(err => console.log(err))
 };

/**
 * Remove task
 * @param {string} id - task ID
 * @param {function} successCallback - Function that runs after successfully deleting object
 */
export const deleteTask = (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error || typeof successCallback !== "function") {
                throw new Error('Task data deleting error!')
            }
            successCallback();
        })
        .catch(err => console.log(err))
};
