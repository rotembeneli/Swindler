import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userService } from '../services/user.service';
import { Slider } from '@material-ui/core'

export const CreateAccount = () => {

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [showMe, setShowMe] = useState('');
    const [email, setEmail] = useState('');
    const [loc, setLoc] = useState(null);
    const [ageRange, setAgeRange] = useState([18, 25]);
    const [locRange, setLocRange] = useState(0);
    const [isFirstFormFilled, setIsFirstFormFilled] = useState(false);

    let navigate = useNavigate();

    const success = (position) => {
        // const coords = position.coords;
        // const coords = { lat: position.coords.latitude, lng: position.coords.longitude }
        // setLoc(loc => ({ ...loc, updatedVal }))
        setLoc({ lat: position.coords.latitude, lng: position.coords.longitude });
    }

    const error = (err) => {
        console.error(err)
    }

    const handleInput = (ev) => {
        ev.preventDefault();
        if ('firstname' === ev.target.name) setName(ev.target.value)
        else if ('birthday' === ev.target.name) setBirthday(ev.target.value);
        else setEmail(ev.target.value);
    }

    const onContinueFirst = () => {
        // console.log(name, birthday, gender, showMe, email);
        if (name !== '' && birthday !== '' && gender !== '' && showMe !== '' && email !== '') {
            setIsFirstFormFilled(prevState => { return true });
        }
        navigator.geolocation.getCurrentPosition(success, error);
        // if (!isFormFilled) {
        //     console.log('not ready')
        //     return;
        // }
    }

    const onContinueSecond = async () => {
        console.log(loc);
        // if (!isFormFilled) {
        //     console.log('not ready')
        //     return;
        // }
        const user = await userService.addUser(name, birthday, gender, showMe, email, loc, ageRange, locRange);
        navigate(`/main-page/${user._id}`);
    }

    return (
        <div>
            <header>swindler</header>
            <h2>CREATE ACCOUNT</h2>
            {!isFirstFormFilled ?
                <div className="first-page">

                    <label>First Name
                        <input type="text" name="firstname" placeholder="First Name" onChange={handleInput} />
                    </label>

                    <label>Birthday
                        <input type="date" name="birthday" onChange={handleInput} />
                    </label>

                    <h5>Gender</h5>
                    <div className="btns-gender">
                        <button className="btn" onClick={() => setGender('male')}>Man</button>
                        <button className="btn" onClick={() => setGender('female')}>Woman</button>
                        <button className="btn">More</button>
                    </div>

                    <h5>Show Me</h5>
                    <div className="btns-showme">
                        <button className="btn" onClick={() => setShowMe('male')}>Men</button>
                        <button className="btn" onClick={() => setShowMe('female')}>Women</button>
                        <button className="btn" onClick={() => setShowMe('everyone')}>Everyone</button>
                    </div>

                    <label>Email Address
                        <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />
                    </label>

                    <h4>Optional</h4>

                    <h5>Passions</h5>
                    <button>+ Add Passions</button>

                    <h5>Sexual Orientation</h5>
                    <button>+ Add Sexual Orientation</button>

                    <button className={isFirstFormFilled ? 'btn-colored' : 'btn-restricted'} onClick={onContinueFirst}>Continue</button>

                </div>
                :
                <div className="second-page">
                    <h1>CHOOSE YOUR PREFERENCES</h1>
                    <h5>Location Range</h5>
                    <Slider
                        value={locRange}
                        min={0}
                        step={1}
                        max={50} //km
                        onChange={(_, value) => setLocRange(value)}
                        valueLabelDisplay="auto"
                    />
                    <h5>Age Range</h5>
                    <Slider
                        value={ageRange}
                        min={18}
                        step={1}
                        max={120} //years
                        onChange={(_, value) => setAgeRange(value)}
                        valueLabelDisplay="auto"
                    />
                    <button className={isFirstFormFilled ? 'btn-colored' : 'btn-restricted'} onClick={onContinueSecond}>Continue</button>
                </div>
            }

        </div>
    )
}
