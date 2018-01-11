import { driverConstants } from '../constants';

let driver = localStorage.getItem("driver");
const initialState = driver ? { loggedIn: true, driver } : {};

export function driverAuthentication(state = initialState, action) {
    switch (action.type) {
        case driverConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                data: action.driver
            };
        case driverConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                data: action.driver
            };
        case driverConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.driver
            };
        case driverConstants.LOGIN_FAILURE:
            return {};
        case driverConstants.LOGOUT:
            return {};
        default:
            return state
    }
}