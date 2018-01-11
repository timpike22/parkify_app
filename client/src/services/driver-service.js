import { driverAuthHeader } from '../helpers';
import axios from 'axios';

export const driverService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(driver) {
    return axios.post('/driver/loginout/', driver).then(handleResponse);    
}
/*
function login(email, password) {
    return axios.post('/driver/authenticate', JSON.stringify({ email, password}))
        .then(response => {
            if (!response.statusText === "OK") {
                return Promise.reject(response.statusText);
            }
                return response.json();
        })
        .then(driver => {
            if (driver && driver.token) {
                localStorage.setItem('driver', JSON.stringify(driver));
            }
                return driver
        });
}
*/

function login(driver) {
    return axios.post('/driver/loginout/', driver).then(handleResponse);
}

function logout() {
    // remove driver from local storage to log driver out
    localStorage.removeItem('driver');
    return axios.get('/driver/loginout/').then(handleResponse);
}

function authenticate() {
    return axios.get('/driver/authenticate/').then(handleResponse);
}

function getAll() {
    return axios.get('/driver').then(handleResponse);
}

function getById(id) {
    return axios.get('/driver/id/' + id).then(handleResponse);
}

function register(driver) {
    console.log(driver)
    return axios.post('/driver', driver).then(handleResponse);
}

function update(driver) {
    return axios.put('/driver/id/' + driver.id).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete('/driver/id/' + id).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.statusText === "OK") {
        return Promise.reject(response.statusText);
    }
    return response;
}