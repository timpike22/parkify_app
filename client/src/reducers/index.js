import { combineReducers } from 'redux';
import ParkingSpaceReducer from './reducerParkingSpace';
import ActiveParkingSpace from './reducerActiveParkingSpace';

const rootReducer = combineReducers({
    parkingSpace: ParkingSpaceReducer,
    activeParkingSpace: ActiveParkingSpace
});

export default rootReducer;