import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChooseConnection } from '../cmps/ChooseConnection'
import { LogIn } from '../cmps/LogIn';

export const EntrancePage = () => {

  const [isModalOn, setIsModalOn] = useState(false);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);

  let navigate = useNavigate();

  return (
    <div className="entrance">
      <button onClick={() => setIsModalOn(!isModalOn)}>Log In</button>
      <button onClick={() => navigate('/new-member')}>Create Account</button>
      {isModalOn && <ChooseConnection setIsModalOn={setIsModalOn} setIsLoginModalOn={setIsLoginModalOn} />}
      {isLoginModalOn && <LogIn setIsLoginModalOn={setIsLoginModalOn} />
      }
    </div>
  )
}
