import { driverAuthHeader } from '../helpers';

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

    return fetch('/drivers/authenticate', requestOptions)
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
    const requestOptions = {
        method: 'GET',
        headers: driverAuthHeader()
    };

    return fetch('/drivers', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: driverAuthHeader()
    };

    return fetch('/drivers/' + id, requestOptions).then(handleResponse);
}

function register(driver) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driver)
    };

    return fetch('/drivers/register', requestOptions).then(handleResponse);
}

function update(driver) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...driverAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(driver)
    };

    return fetch('/drivers/' + driver.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: driverAuthHeader()
    };

    return fetch('/drivers/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}