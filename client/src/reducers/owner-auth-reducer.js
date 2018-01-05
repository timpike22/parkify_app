import { ownerConstants } from '../constants';

let owner = JSON.parse(localStorage.getItem('owner'));
const initialState = owner ? { loggedIn: true, owner } : {};

export function ownerAuthentication(state = initialState, action) {
    switch (action.type) {
        case ownerConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                owner: action.owner
            };
        case ownerConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                owner: action.owner
            };
        case ownerConstants.LOGIN_FAILURE:
            return {};
        case ownerConstants.LOGOUT:
            return {};
        default:
            return state
    }
}