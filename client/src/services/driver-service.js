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

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return axios.post('/drivers/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(driver => {
            // login successful if there's a jwt token in the response
            if (driver && driver.token) {
                // store driver details and jwt token in local storage to keep driver logged in between page refreshes
                localStorage.setItem('driver', JSON.stringify(driver));
            }

            return driver;
        });
}

function logout() {
    // remove driver from local storage to log driver out
    localStorage.removeItem('driver');
}

function getAll() {
    return axios.get('/driver').then(handleResponse);
}

function getById(id) {
    return axios.get('/driver/' + id).then(handleResponse);
}

function register(driver) {
    return axios.post('/driver', driver).then(handleResponse);
}

function update(driver) {
    return axios.put('/driver/' + driver.id).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete('/driver/' + id).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}