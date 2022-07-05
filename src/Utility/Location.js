const GOOGLE_API_KEY = 'AIzaSyDYtlTuNKMHc-SG8VyJO8ay2D-5MAxKryA';

export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);

    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }

    const data = await response.json();

    // if (data.error.message) {
    //     throw new Error(data.error.message);
    // }
    const address = data.results[0].formatted_address;
    return address;
}

export async function getCoordsFromAddress(address) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch coordinates. Please try again');
    }

    const data = await response.json();

    // if (data.error.message) {
    //     throw new Error(data.error.message);
    // }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}