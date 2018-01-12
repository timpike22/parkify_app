import { ownerConstants } from '../constants';

export function ownerRegistration(state = {}, action) {
    switch (action.type) {
        case ownerConstants.REGISTER_REQUEST:
            return { ownerRegistering: true };
        case ownerConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.owner
            };
        case ownerConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}