import { ownerConstants } from '../constants';

let owner = localStorage.getItem("owner");
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
                ...state,
                loggedIn: true,
                owner: action.owner
            };
        case ownerConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.owner
            };
        case ownerConstants.LOGIN_FAILURE:
            return {};
        case ownerConstants.LOGOUT:
            return {};
        default:
            return state
    }
}