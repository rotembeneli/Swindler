import React, { useState, useEffect } from 'react'
import { Main } from '../cmps/Main'
import { SideBar } from '../cmps/SideBar'
import { userService } from '../services/user.service'
import { matchService } from '../services/match.service'

export const App = () => {

    const [isProfilePage, setIsProfilePage] = useState(false);
    const [admin, setAdmin] = useState({});
    const [users, setUsers] = useState([]);
    const [offers, setOffers] = useState([]);
    const [currOffer, setCurrOffer] = useState({});
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function fetch() {
            const data = userService.getLoggedinUser();
            const datas = await userService.queryAll();
            setAdmin(data);
            setUsers(datas);
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const data = await matchService.findOffers(admin, users);
            setOffers(data);
            setCurrOffer(data[0]);
        }
        fetch();
    }, [users])

    useEffect(() => {
        async function fetch() {
            const data = await matchService.getMatches(admin._id);
            console.log('data from get matches', data)
            console.log('updated')
            setMatches(data);
        }
        fetch()
    }, [admin.likedUsers?.length])

    const onDislike = async () => {
        let cloneOffers = [...offers];
        cloneOffers.shift();
        admin.dislikedUsers.push(currOffer._id)
        currOffer.dislikedUsers.push(admin._id);
        const newAdmin = await userService.updateUser(admin); //updates admin disliked users
        userService.updateUser(currOffer); //updates user disliked with admin id
        setAdmin(newAdmin);
        setOffers(cloneOffers);
        if (!cloneOffers.length) {
            console.log('no more offers');
            setCurrOffer({});
            return;
        }
        setCurrOffer(cloneOffers[0]);
    }

    const onLike = async () => {
        let cloneOffers = [...offers];
        cloneOffers.shift();
        admin.likedUsers.push(currOffer._id);
        currOffer.likedUsers.push(admin._id); //for development
        const newAdmin = await userService.updateUser(admin);
        const newUser = await userService.updateUser(currOffer);
        matchService.checkMatch(newAdmin, newUser);
        setAdmin(newAdmin);
        setOffers(cloneOffers);
        if (!cloneOffers.length) {
            console.log('no more offers');
            setCurrOffer({});
            return;
        }
        setCurrOffer(cloneOffers[0]);
    }

    console.log('admin outside', admin)
    // console.log('currOffer outside', currOffer)

    return (
        <div className="app flex">
            <SideBar isProfilePage={isProfilePage} setIsProfilePage={setIsProfilePage} admin={admin} users={users} matches={matches} />
            <Main isProfilePage={isProfilePage} setIsProfilePage={setIsProfilePage} admin={admin} users={users} offers={offers} currOffer={currOffer} onDislike={onDislike} onLike={onLike} />
        </div>
    )
}
