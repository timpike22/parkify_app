
export function selectParkingSpace(spot) {
    return {
        type: 'PARKINGSPACE_SELECTED',
        payload: spot
    };
}

