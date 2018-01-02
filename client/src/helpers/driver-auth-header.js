export function driverAuthHeader() {
    // return authorization header with jwt token
    let driver = JSON.parse(localStorage.getItem('driver'));

    if (driver && driver.token) {
        return { 'Authorization': 'Bearer ' + driver.token };
    } else {
        return {};
    }
}