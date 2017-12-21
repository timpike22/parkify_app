import axios from 'axios';

export function selectParkingSpace(spot) {
    return {
        type: 'PARKINGSPACE_SELECTED',
        payload: spot
    };
}




const API_KEY = 'AIzaSyDkFM9saBLSb7Vb04SRihSyGC7Eg5YPBdI';
const ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json/&key=${API_KEY}`;
 

export const FETCH_PARKINGSPACE = 'FETCH_PARKINGSPACE';



export function fetchParkingSpace(city) {
    const url = `${ROOT_URL}?${city}`;
    const request = axios.get(url);
    return {
        type: FETCH_PARKINGSPACE,
        payload: request
    };
}

//allow this to take in a latitude and longitude and then spit out the address when searched