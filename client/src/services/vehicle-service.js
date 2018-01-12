import axios from 'axios';

export const vehicleService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


function getAll() {
    return axios.get('/vehicle').then(handleResponse);
}

function getById(id) {
    return axios.get('/vehicle/id/' + id).then(handleResponse);
}

function create(owner) {
    return axios.post('/vehicle', owner).then(handleResponse);
}

function update(owner) {
    return axios.put('/vehicle/id/' + owner.id).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete('/vehicle/id/' + id).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.statusText === "OK") {
        return Promise.reject(response.statusText);
    }
    return response;
}