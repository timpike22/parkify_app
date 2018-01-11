import { userConstants } from '../constants';

export function Registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.user
            };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}