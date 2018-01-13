import { parkingSpotConstants } from '../constants';

export function parkingSpotCreate(state = {}, action) {
    switch (action.type) {
        case parkingSpotConstants.CREATE_REQUEST:
            return { creating: true };
        case parkingSpotConstants.CREATE_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.create
            };
        case parkingSpotConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}