import { combineReducers } from 'redux';
import { driverRegistration } from './driver-registration-reducer';
import { Registration } from './registration-reducer';
import { alert } from './alert-reducer';
import ParkingSpaceReducer from './reducerParkingSpace';
import ActiveParkingSpace from './reducerActiveParkingSpace';
import { driverAuthentication } from './driver-auth-reducer';
import { ownerAuthentication } from './owner-auth-reducer';
import { drivers } from './drivers-reducer';
import { owners } from './owners-reducer';


const rootReducer = combineReducers({
    parkingSpace: ParkingSpaceReducer,
    activeParkingSpace: ActiveParkingSpace,
    ownerAuthentication,
    driverAuthentication,
    driverRegistration,
    Registration,
    drivers,
    owners,
    alert
});

export default rootReducer;
