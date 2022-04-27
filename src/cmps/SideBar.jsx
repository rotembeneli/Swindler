import React, { useEffect, useState } from 'react'
import { matchService } from '../services/match.service';
import { Matches } from './Matches';
import { Messages } from './Messages';

export const SideBar = ({ isProfilePage, setIsProfilePage, admin, users, matches }) => {

  const [isMatchesScr, setIsMatchesScr] = useState(true);

  return (
    <div className="side-bar">

      <div className="top-section flex align-center">
        {isProfilePage ?
          <div className="homepage-link" onClick={() => setIsProfilePage(false)}>
            tinder
          </div>
          :
          <div className="profile-link" onClick={() => setIsProfilePage(true)}>
            <div className="img-container"></div>
            <div>{admin?.fullname}</div>
          </div>}
      </div>
      <div className="main-side">
        {isProfilePage ?
          <div className="profile-side-bar">user's settings</div>
          :
          <div className="homepage-side-bar">
            <div className="screen-btns">
              <button className={`matches-screen btn ${isMatchesScr ? "markScr" : ""}`}
                onClick={() => setIsMatchesScr(true)}>matches</button>
              <button className={`messages-screen btn ${isMatchesScr ? "" : "markScr"}`}
                onClick={() => setIsMatchesScr(false)}>messages</button>
            </div>
            {isMatchesScr ?
              <Matches matches={matches} />
              :
              <Messages />
            }
          </div>
        }
      </div>
    </div>
  )
}
