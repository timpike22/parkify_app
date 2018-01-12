/*import { userConstants } from '../constants';

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, user } : {};

export function userAuthentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                data: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                data: action.user
            };
        case userConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}*/