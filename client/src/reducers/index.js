import { combineReducers } from 'redux';
import { driverRegistration } from './driver-registration-reducer';
import { ownerRegistration } from './owner-registration-reducer';
import { alert } from './alert-reducer';
import ParkingSpaceReducer from './reducerParkingSpace';
import ActiveParkingSpace from './reducerActiveParkingSpace';
import { driverAuthentication } from './driver-auth-reducer';
import { ownerAuthentication } from './owner-auth-reducer';
import { drivers } from './drivers-reducer';
import { owners } from './owners-reducer';
import { vehicleCreation } from './vehicle-create-reducer';
import { parkingSpotCreation } from './parkingSpot-create-reducer';


const rootReducer = combineReducers({
    parkingSpace: ParkingSpaceReducer,
    activeParkingSpace: ActiveParkingSpace,
    ownerAuthentication,
    driverAuthentication,
    driverRegistration,
    ownerRegistration,
    drivers,
    owners,
    vehicleCreation,
    parkingSpotCreation,
    alert
});

export default rootReducer;
