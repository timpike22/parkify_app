import { ownerAuthHeader } from '../helpers';
import axios from 'axios';

export const ownerService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
/*
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return axios.post('/owners/authenticate', JSON.stringify({ email, password }))
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(owner => {
            // login successful if there's a jwt token in the response
            if (owner && owner.token) {
                // store owner details and jwt token in local storage to keep owner logged in between page refreshes
                localStorage.setItem('owner', JSON.stringify(owner));
            }

            return owner;
        });
}

function login(email, password) {
    return axios.post('/owner/authenticate', JSON.stringify({ email, password}))
        .then(response => {
            if (!response.statusText === "OK") {
                return Promise.reject(response.statusText);
            }
                return response.json();
        })
        .then(owner => {
            if (owner && owner.token) {
                localStorage.setItem('owner', JSON.stringify(owner));
            }
                return owner
        });
}
*/

function login(owner) {
    return axios.post('/check-owner-auth', owner).then(handleResponse);
}

function logout() {
    // remove owner from local storage to log owner out
    localStorage.removeItem('owner');
}

function getAll() {
    return axios.get('/owner').then(handleResponse);
}

function getById(id) {
    return axios.get('/owner/' + id).then(handleResponse);
}

function register(owner) {
    console.log(owner)
    return axios.post('/owner', owner).then(handleResponse);
}

function update(owner) {
    return axios.put('/owner/' + owner.id).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete('/owner/' + id).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.statusText === "OK") {
        return Promise.reject(response.statusText);
    }
    return response;
    
}