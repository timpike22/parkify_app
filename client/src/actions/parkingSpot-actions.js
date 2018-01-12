import { parkingSpotConstants } from '../constants';
import { parkingSpotService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const parkingSpotActions = {
    create,
    getAll,
    delete: _delete
};

export const createSuccess = (parkingSpot) => {
    return{
        type: parkingSpotConstants.CREATE_SUCCESS, 
        parkingSpot
    }
}

export const createFailure = (parkingSpot) => {
    return {
        type: parkingSpotConstants.CREATE_FAILURE,
        parkingSpot
    }
}

function create(parkingSpot) {
    return dispatch => {
        dispatch(request(parkingSpot));

        parkingSpotService.create(parkingSpot)
            .then(
            parkingSpot => {
                dispatch(success(parkingSpot));
                window.localStorage.setItem('parkingSpot', JSON.stringify(parkingSpot));
                history.push('/');
                dispatch(alertActions.success('Creation successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            }
            );
    };

    function request(parkingSpot) { return { type: parkingSpotConstants.CREATE_REQUEST, parkingSpot } }
    function success(parkingSpot) { return { type: parkingSpotConstants.CREATE_SUCCESS, parkingSpot } }
    function failure(error) { return { type: parkingSpotConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        parkingSpotService.getAll()
            .then(
            parkingSpots => dispatch(success(parkingSpots)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: parkingSpotConstants.GETALL_REQUEST } }
    function success(parkingSpot) { return { type: parkingSpotConstants.GETALL_SUCCESS, parkingSpot } }
    function failure(error) { return { type: parkingSpotConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        parkingSpotService.delete(id)
            .then(
            parkingSpot => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(id) { return { type: parkingSpotConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: parkingSpotConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: parkingSpotConstants.DELETE_FAILURE, id, error } }
} 