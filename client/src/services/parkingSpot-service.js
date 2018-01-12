import axios from 'axios';

export const parkingSpotService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


function getAll() {
    return axios.get('/parkingspot').then(handleResponse);
}

function getById(id) {
    return axios.get('/parkingspot/id/' + id).then(handleResponse);
}

function create(parkingSpot) {
    return axios.post('/parkingSpot', parkingSpot).then(handleResponse);
}

function update(parkingSpot) {
    return axios.put('/parkingspot/id/' + parkingSpot.id).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete('/parkingspot/id/' + id).then(handleResponse);
}

function handleResponse(response) {
    if (!response.statusText === "OK") {
        return Promise.reject(response.statusText);
    }
    return response;
}
