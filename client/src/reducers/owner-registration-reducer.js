import { ownerConstants } from '../constants';

export function ownerRegistration(state = {}, action) {
    switch (action.type) {
        case ownerConstants.REGISTER_REQUEST:
            return { registering: true };
        case ownerConstants.REGISTER_SUCCESS:
            return {};
        case ownerConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}