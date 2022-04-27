import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

export const ReactionBtns = ({ onDislike, onLike }) => {

    return (
        <div className="reaction-btns">
            {/* <button className="btn">return</button> */}
            <button className="btn" onClick={onDislike}><FaTimes /></button>
            {/* <button className="btn">star</button> */}
            <button className="btn" onClick={onLike}><AiFillHeart /></button>
            {/* <button className="btn">boost</button> */}
        </div>
    )
}
