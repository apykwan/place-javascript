import { Map } from './UI/Map';

class LoardedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headTitleEl = document.querySelector('header h1');
        headTitleEl.textContent = address;
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
console.log(queryParams);
const coords = {
    lat: parseFloat(queryParams.get('lat')),
    lng: +queryParams.get('lng')
};
const address = queryParams.get('address');

new LoardedPlace(coords, address);