import { utilService } from './util.service';
import { storageService } from './async-storage.service';
import { matchService } from './match.service';

const STORAGE_KEY = 'user-tinder' //admin
const STORAGE_KEY2 = 'users-storage' //users

export const userService = {
    queryAll,
    addUser,
    updateUser,
    getLoggedinUser
}

async function addUser(name, birthday, gender, showMe, email, loc, ageRange, locRange) {
    console.log('name, birthday, gender, showMe, email', name, birthday, gender, showMe, email, loc, ageRange, locRange)
    const user = {
        fullname: name,
        age: utilService.calculateAge(birthday),
        gender,
        email,
        isAdmin: true,
        imgUrls: [],
        joinedAt: Date.now(),
        location: loc,
        prefs: {
            gender: showMe,
            minAge: ageRange[0],
            maxAge: ageRange[1],
            locRange
        },
        likedUsers: [],
        dislikedUsers: [],
    }
    const newUser = await storageService.post(STORAGE_KEY2, user);
    _setLoggedinUser(newUser);
    // matchService.createMatchCard(newUser._id);
    return newUser;
}

async function updateUser(user) {
    // console.log('user in update func', user);
    const logged = getLoggedinUser();
    if (user._id === logged._id) _setLoggedinUser(user);
    const newUser = await storageService.put(STORAGE_KEY2, user);
    return newUser;
}

async function queryAll() {
    const users = await storageService.query(STORAGE_KEY2);
    if (!users.length) _postAll();
    return users;
}

async function _postAll() {
    const data = await storageService.postMany(STORAGE_KEY2, gUsers);
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

const gUsers = [
    {
        _id: "5ecb704ad32342bf9288f2b0",
        fullname: "Noa Fix",
        gender: "female",
        location: {
            lat: 35.42,
            lng: 34.22,
            address: "13 Alenby, Tel-Aviv"
        },
        birthdate: "2000-11-23",
        age: 21,
        email: "noafix@gmail.com",
        password: "$2a$10$bWAO7e3gjEZkWlVxfe2UmeJ6VbMLzug7rXqVD5lN9F5qDXA5/tQ6G",
        isAdmin: false,
        imgUrls: [
            "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1545912453-3d32e20f72bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ],
        joinedAt: 1991274912523,
        prefs: {
            minAge: 20,
            maxAge: 40,
            asto: "Libra",
            gender: "male",
            city: "Tel-Aviv"
        },
        likedUsers: [],
        dislikedUsers: [],
        // reactions: [
        //     {
        //         id: "r101",
        //         to: "{miniUser}",
        //         type: "like",
        //         at: 1590995441467
        //     },
        //     {
        //         id: "r102",
        //         to: "miniUser",
        //         type: "dislike",
        //         at: 1590997458720
        //     }
        // ]
    },
    {
        _id: "5ecb704ad22342bf9288f2b0",
        fullname: "Eran Cohen",
        gender: "male",
        location: {
            lat: -22.7,
            lng: -43.3,
            address: "13 Alenby, Tel-Aviv"
        },
        birthdate: "1995-03-23",
        age: 27,
        email: "erancohen@gmail.com",
        password: "$2a$10$bWAO7e3gjSAkWlVxfe2UmeJ6VbMLzug7rXqVD5lN9F5qDXA5/tQ6G",
        isAdmin: false,
        imgUrls: [
            "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1545912453-3d32e20f72bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ],
        joinedAt: 1991274912547,
        prefs: {
            minAge: 22,
            maxAge: 26,
            asto: "Libra",
            gender: "female",
            city: "Tel-Aviv"
        },
        likedUsers: [],
        dislikedUsers: []
    },
    {
        _id: "5eeb704ad32342bf9288f2b0",
        fullname: "Sharon Dan",
        gender: "female",
        location: {
            lat: 35.42,
            lng: 34.22,
            address: "13 Alenby, Tel-Aviv"
        },
        birthdate: "2001-11-23",
        age: 20,
        email: "sharondan@gmail.com",
        password: "$2a$10$bWAO7e3gjEZkWlVxfe2UmeJ6VbMLdsg7rXqVD5lN9F5qDXA5/tQ6G",
        isAdmin: false,
        imgUrls: [
            "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1545912453-3d32e20f72bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ],
        joinedAt: 19912749134523,
        prefs: {
            minAge: 23,
            maxAge: 30,
            asto: "Libra",
            gender: "male",
            city: "Tel-Aviv"
        },
        likedUsers: [],
        dislikedUsers: []
    },
    {
        _id: "5ecb704ad32342bf9288f2b0",
        fullname: "Daniel Lori",
        gender: "male",
        location: {
            lat: 35.42,
            lng: 34.22,
            address: "13 Alenby, Tel-Aviv"
        },
        birthdate: "1994-05-16",
        age: 28,
        email: "daniellori@gmail.com",
        password: "$2a$10$bWAO7e3gjEZkWlVxfe2UmeJ6VbMLslg7rXqVD5lN9F5qDXA5/tQ6G",
        isAdmin: false,
        imgUrls: [
            "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1545912453-3d32e20f72bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ],
        joinedAt: 1991274912423,
        prefs: {
            minAge: 20,
            maxAge: 24,
            asto: "Libra",
            gender: "male",
            city: "Tel-Aviv"
        },
        likedUsers: [],
        dislikedUsers: []
    },
    {
        _id: "5ecb704gf32342bf9288f2b0",
        fullname: "Dori Navon",
        gender: "male",
        location: {
            lat: 35.42,
            lng: 34.22,
            address: "13 Alenby, Tel-Aviv"
        },
        birthdate: "1999-08-23",
        age: 22,
        email: "dorinavon@gmail.com",
        password: "$2a$10$bWAO7e3eoEZkWlVxfe2UmeJ6VbMLzug7rXqVD5lN9F5qDXA5/tQ6G",
        isAdmin: false,
        imgUrls: [
            "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1545912453-db258ca9b7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1545912453-3d32e20f72bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ],
        joinedAt: 1991274912573,
        prefs: {
            minAge: 20,
            maxAge: 35,
            asto: "Libra",
            gender: "female",
            city: "Tel-Aviv"
        },
        likedUsers: [],
        dislikedUsers: []
    }
]

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}