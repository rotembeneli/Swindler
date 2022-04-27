import React, { useState } from 'react';
import { Offer } from './Offer'

export const Main = ({ isProfilePage, setIsProfilePage, admin, users, offers, currOffer, onDislike, onLike }) => {

    return (
        <div className="main">
            {/* <div className="container"> */}
            {!isProfilePage &&
                <Offer admin={admin} users={users} offers={offers} currOffer={currOffer} onDislike={onDislike} onLike={onLike} />}
            {isProfilePage && <h1>Profile</h1>}
            {/* </div> */}
        </div>
    )
}
