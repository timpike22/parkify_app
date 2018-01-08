import { ownerConstants } from '../constants';
import { ownerService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const ownerActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(email, password) {
    return dispatch => {
        dispatch(loginRequest({ email }));

        ownerService.login(email, password)
            .then(
            owner => {
                dispatch(loginSuccess(owner));
                history.push('/login/owner');
            },
            error => {
                dispatch(loginFailure(error));
                dispatch(alertActions.error(error.messege));
            }
            );
    };

}

function logout() {
    ownerService.logout();
    return { type: ownerConstants.LOGOUT };
} 

export const loginSuccess = (owner) => {
    return {
        type: ownerConstants.LOGIN_SUCCESS,
        owner
    }
}

export const loginRequest = (owner) => {
    return {
        type: ownerConstants.LOGIN_REQUEST,
        owner
    }
}

export const loginFailure = (owner) => {
    return {
        type: ownerConstants.LOGIN_FAILURE,
        owner
    }
}

export const registerSuccess = (owner) => {
    return{
        type: ownerConstants.REGISTER_SUCCESS, 
        owner
    }
}

export const registerFailure = (owner) => {
    return {
        type: ownerConstants.REGISTER_FAILURE,
        owner
    }
}

function register(owner) {
    return dispatch => {
        dispatch(request(owner));

        ownerService.register(owner)
            .then(
            owner => {
                dispatch(success(owner));
                window.localStorage.setItem('owner', JSON.stringify(owner));
                history.push('/');
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            }
            );
    };

    function request(owner) { return { type: ownerConstants.REGISTER_REQUEST, owner } }
    function success(owner) { return { type: ownerConstants.REGISTER_SUCCESS, owner } }
    function failure(error) { return { type: ownerConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        ownerService.getAll()
            .then(
            owners => dispatch(success(owners)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: ownerConstants.GETALL_REQUEST } }
    function success(owners) { return { type: ownerConstants.GETALL_SUCCESS, owners } }
    function failure(error) { return { type: ownerConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        ownerService.delete(id)
            .then(
            owner => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(id) { return { type: ownerConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: ownerConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: ownerConstants.DELETE_FAILURE, id, error } }
} 