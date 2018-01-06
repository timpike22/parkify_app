import { driverConstants } from '../constants';

export function drivers(state = {}, action) {
    switch (action.type) {
        case driverConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case driverConstants.GETALL_SUCCESS:
            return {
                items: action.drivers
            };
        case driverConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case driverConstants.DELETE_REQUEST:
            // add 'deleting:true' property to driver being deleted
            return {
                ...state,
                items: state.items.map(driver =>
                    driver.id === action.id
                        ? { ...driver, deleting: true }
                        : driver
                )
            };
        case driverConstants.DELETE_SUCCESS:
            // remove deleted driver from state
            return {
                items: state.items.filter(driver => driver.id !== action.id)
            };
        case driverConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to driver 
            return {
                ...state,
                items: state.items.map(driver => {
                    if (driver.id === action.id) {
                        // make copy of driver without 'deleting:true' property
                        const { deleting, ...driverCopy } = driver;
                        // return copy of driver with 'deleteError:[error]' property
                        return { ...driverCopy, deleteError: action.error };
                    }

                    return driver;
                })
            };
        default:
            return state
    }
}