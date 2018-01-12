import { vehicleConstants } from '../constants';

export function vehicleCreation(state = {}, action) {
    switch (action.type) {
        case vehicleConstants.CREATE_REQUEST:
            return { creating: true };
        case vehicleConstants.CREATE_SUCCESS:
            return {
                ...state,
                data: action.owner
            };
        case vehicleConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}