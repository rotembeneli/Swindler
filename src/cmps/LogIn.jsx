import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const LogIn = ({ setIsLoginModalOn }) => {

    const [phoneNum, setPhoneNum] = useState('');

    let navigate = useNavigate();

    return (
        <div className="login">
            <div className='byphone'>
                <button onClick={() => setIsLoginModalOn(false)}>x</button>
                <h3>Enter Your Mobile Number</h3>
                <input type="number" onChange={(ev) => setPhoneNum(ev.target.value)} value={phoneNum} />
                <button onClick={() => navigate("/homepage")}>Continue</button>
            </div>

        </div>
    )
}
