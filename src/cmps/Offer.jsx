import React, { useState, useEffect } from 'react';
import { ReactionBtns } from './ReactionBtns'
import { matchService } from '../services/match.service';
import { userService } from '../services/user.service';

export const Offer = ({ admin, users, offers, currOffer, onDislike, onLike }) => {

    return (
        <div className="offer-container">
            <div className="offer">{currOffer?.fullname}{currOffer?.age}</div>
            <ReactionBtns onDislike={onDislike} onLike={onLike} />
        </div>
    )
}
