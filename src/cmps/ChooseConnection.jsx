import React from 'react'

export const ChooseConnection = ({ setIsModalOn, setIsLoginModalOn }) => {

    const byPhone = () => {
        setIsModalOn(false);
        setIsLoginModalOn(true);
    }

    return (
        <div className="chooseConnection">
            <button onClick={() => setIsModalOn(false)}>x</button>
            <h3>GET STARTED</h3>
            <button>LOG IN WITH FACEBOOK</button>
            <button onClick={byPhone}>LOG IN WITH PHONE NUMBER</button>
        </div>
    )
}
