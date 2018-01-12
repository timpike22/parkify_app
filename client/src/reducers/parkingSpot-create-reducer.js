import { parkingSpotConstants } from '../constants';

export function parkingSpotCreation(state = {}, action) {
    switch (action.type) {
        case parkingSpotConstants.CREATE_REQUEST:
            return { creating: true };
        case parkingSpotConstants.CREATE_SUCCESS:
            return {
                ...state,
                data: action.owner
            };
        case parkingSpotConstants.CREATE_FAILURE:
            return {};
        default:
            return state
    }
}
