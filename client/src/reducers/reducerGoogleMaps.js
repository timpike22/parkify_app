import { FETCH_PARKINGSPACE } from "../actions/index";

export default function(state = [], action) {
    console.log('Action Recieved', action);

    switch (action.type) {
        case FETCH_PARKINGSPACE:
        //add a new instant of state instead of manipulating current state
        return [ action.payload.data, ...state ];
        //will return [ city, city, city ];
    }

    return state;
}