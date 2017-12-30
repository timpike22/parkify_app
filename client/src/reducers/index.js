import { combineReducers } from 'redux';
import { registration } from './registration-reducer';
import { users } from './users-reducer';
import { alert } from './alert-reducer';
import ParkingSpaceReducer from './reducerParkingSpace';
import ActiveParkingSpace from './reducerActiveParkingSpace';
import { authentication } from './auth-reducer';

const rootReducer = combineReducers({
    parkingSpace: ParkingSpaceReducer,
    activeParkingSpace: ActiveParkingSpace,
    authentication,
    registration,
    users,
    alert
});

export default rootReducer;
