import { vehicleConstants } from '../constants';

export function vehicleCreation(state = {}, action) {
    switch (action.type) {
        case vehicleConstants.CREATE_REQUEST:
            return { registering: true };
        case vehicleConstants.CREATE_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.vehicle
            };
        case ownerConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}