import { driverConstants } from '../constants';

let driver = JSON.parse(localStorage.getItem('driver'));
const initialState = driver ? { loggedIn: true, driver } : {};

export function driverAuthentication(state = initialState, action) {
    switch (action.type) {
        case driverConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                driver: action.driver
            };
        case driverConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                driver: action.driver
            };
        case driverConstants.LOGIN_FAILURE:
            return {};
        case driverConstants.LOGOUT:
            return {};
        default:
            return state
    }
}