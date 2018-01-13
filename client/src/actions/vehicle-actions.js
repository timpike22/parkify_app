import { vehicleConstants } from '../constants';
import { vehicleService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const vehicleActions = {
    create,
    getAll,
    delete: _delete
};

export const createSuccess = (vehicle) => {
    return{
        type: vehicleConstants.CREATE_SUCCESS, 
        vehicle
    }
}

export const createFailure = (vehicle) => {
    return {
        type: vehicleConstants.CREATE_FAILURE,
        vehicle
    }
}

function create(vehicle) {
    return dispatch => {
        dispatch(request(vehicle));

        vehicleService.create(vehicle)
            .then(
            vehicle => {
                dispatch(success(vehicle));
                window.localStorage.setItem('vehicle', JSON.stringify(vehicle));
                history.push('/');
                dispatch(alertActions.success('Creation successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            }
            );
    };

    function request(vehicle) { return { type: vehicleConstants.CREATE_REQUEST, vehicle } }
    function success(vehicle) { return { type: vehicleConstants.CREATE_SUCCESS, vehicle } }
    function failure(error) { return { type: vehicleConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        vehicleService.getAll()
            .then(
            vehicles => dispatch(success(vehicles)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: vehicleConstants.GETALL_REQUEST } }
    function success(vehicle) { return { type: vehicleConstants.GETALL_SUCCESS, vehicle } }
    function failure(error) { return { type: vehicleConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        vehicleService.delete(id)
            .then(
            vehicle => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(id) { return { type: vehicleConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: vehicleConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: vehicleConstants.DELETE_FAILURE, id, error } }
} 
