import { areArraysEqual } from '@mui/base';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';

const STORAGE_KEY = 'match-tinder'

export const matchService = {
    queryMatchesCards,
    // createMatchCard,
    findOffers,
    checkMatch,
    getMatches,
}

function _createMatchCard(admin, user) {

    const match = {
        user1: {
            _id: admin._id,
            fullname: admin.fullname,
            imgUrl: admin.imgUrls[0] || ""
        },
        user2: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrls[0] || ""
        },
        msgs: []
    }
    storageService.post(STORAGE_KEY, match);

}

async function queryMatchesCards() {
    const matches = await storageService.query(STORAGE_KEY);
    if (!matches.length) _postMatchesCards();
    return matches;
}

function findOffers(user, users) {
    const { prefs } = user;
    const offers = users.filter(offer => {
        const dist = utilService.getDistanceFromLatLngInKm(user.location, offer.location);
        const ageCheck = prefs.minAge <= offer.age && prefs.maxAge >= offer.age && user.age >= offer.prefs.minAge && user.age <= offer.prefs.maxAge;
        const firstGenderCheck = prefs.gender === offer.gender || prefs.gender === "everyone"; //check what user asked in prefs of "showme"
        const secondGenderCheck = offer.prefs.gender === user.gender || offer.prefs.gender === "everyone"; //check what offer asked in prefs of "showme"
        return prefs.locRange >= dist && ageCheck && firstGenderCheck && secondGenderCheck;
    })
    return offers;
}

function checkMatch(admin, user) {
    if (user.likedUsers.includes(admin._id)) {
        _createMatchCard(admin, user);
    }
}

function getMatches(adminId) {
    return _getMatchCardsById(adminId);
}

async function _getMatchCardsById(userId) {
    const matches = await queryMatchesCards();
    const f = matches.filter(card => card.user1._id === userId || card.user2._id === userId);
    console.log('matches found', f);
    return f;
}

async function _postMatchesCards() {
    const data = await storageService.postManyMatches(STORAGE_KEY, gMatches);
}




const gMatches = [
    // { //eran
    // user1: {
    //     "_id": "5ed39dfc71d6da0d6f1b4d59",
    //     "fullname": "John Sass",
    //     "imgUrl": "https://images.unsplash.com/photo-1496346586692-2822e9af5593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    // },
    // user2: {
    //     "_id": "5ecb704ad32342bf9288f2b0",
    //     "fullname": "Noa Fix",
    //     "imgUrl": "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    // },
    // msgs: [
    //     {
    //         "byUserId": "5ed39dfc71d6da0d6f1b4d59",
    //         "txt": "Thanks for the like... wassap?",
    //         "createdAt": 1591001240097
    //     }
    // ]
    // },
    // { //dori
    // msgs: [
    //     {
    //         "byUserId": "5ed39dfc71d6da0d6f1b4d59",
    //         "txt": "Thanks for the like... wassap?",
    //         "createdAt": 1591001240097
    //     }
    // ]
    // }
]