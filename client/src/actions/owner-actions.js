import { ownerConstants } from '../constants';
import { ownerService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const ownerActions = {
    logout,
    getAll,
    delete: _delete
};



function logout() {
    ownerService.logout();
    return { type: ownerConstants.LOGOUT };
} 

export const ownerLoginSuccess = (owner) => {
    return {
        type: ownerConstants.LOGIN_SUCCESS,
        owner
    }
}



export const ownerLoginFailure = (owner) => {
    return {
        type: ownerConstants.LOGIN_FAILURE,
        owner
    }
}

export const ownerRegisterSuccess = (owner) => {
    return{
        type: ownerConstants.REGISTER_SUCCESS, 
        owner
    }
}

export const ownerRegisterFailure = (owner) => {
    return {
        type: ownerConstants.REGISTER_FAILURE,
        owner
    }
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