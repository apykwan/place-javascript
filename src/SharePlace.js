import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getAddressFromCoords, getCoordsFromAddress } from './Utility/Location';

class Placefinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    }

    sharePlaceHandler() {
        const sharedLinkInputElement = document.getElementById('share-link');
        if (!navigator.clipboard) {
            sharedLinkInputElement.select();
            return;
        }
        navigator.clipboard.writeText(sharedLinkInputElement.value)
            .then(() => {
                alert('Copied into clipboard');
            })
            .catch(err => {
                console.log(err);
                sharedLinkInputElement.select();
            });
    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            return alert('Location feature is not supportted by your browswer! Please manually enter the an address');
        };

        const modal = new Modal('loading-modal-content', ' Loading Location - Please Wait');
        modal.show();

        navigator.geolocation.getCurrentPosition(
            async successResult => {
                modal.hide();
                const coordinates = {
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                const address = await getAddressFromCoords(coordinates);
                this.selectPlace(coordinates, address);
            },
            error => {
                modal.hide();
                alert('Could not locate! Please enter an address')
            }
        );
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered - please try again!');
            return;
        }
        const modal = new Modal('loading-modal-content', ' Loading Location - Please Wait');
        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates, address);
            modal.hide();
        } catch (err) {
            modal.hide();
            alert(err.message);
        }   
    }
}

const placeFinder = new Placefinder();