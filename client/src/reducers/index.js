import { combineReducers } from 'redux';
import ParkingSpaceReducer from './reducer_parkingSpace';
import ActiveParkingSpace from './reducer_active_parkingSpace';

const rootReducer = combineReducers({
    parkingSpace: ParkingSpaceReducer,
    activeParkingSpace: ActiveParkingSpace
});

export default rootReducer;