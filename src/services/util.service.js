export const utilService = {
    makeId,
    getRandomIntInclusive,
    debounce,
    formatTime,
    calculateAge,
    getDistanceFromLatLngInKm
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function debounce(func, wait) {
    let timeout
    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function formatTime() {
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    return `${day}/${month}/${year}`
}

function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    // console.log(birthDate)
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getDistanceFromLatLngInKm(coord2, coord1) {
    // console.log('coord1, coord2', coord1, coord2)
    var R = 6371; // Radius of the earth in km
    var dLat = _deg2rad(coord2.lat - coord1.lat);  // deg2rad below
    var dLng = _deg2rad(coord2.lng - coord1.lng);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(_deg2rad(coord1.lat)) * Math.cos(_deg2rad(coord2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = (R * c) / 1000; // Distance in km
    return distance;
}

function _deg2rad(deg) {
    return deg * (Math.PI / 180)
}