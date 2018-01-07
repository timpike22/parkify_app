import { driverConstants } from '../constants';

export function driverRegistration(state = {}, action) {
    switch (action.type) {
        case driverConstants.REGISTER_REQUEST:
            return { registering: true };
        case driverConstants.REGISTER_SUCCESS:
            console.log(action);
            return {
                ...state,
                data: action.driver
            };
        case driverConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}