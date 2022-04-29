import React from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const Header = () => {

    const nav = useNavigate();

    return (
        <div className={'Header flex gap justify-content-between'}>
            <div>cia bus LOGO</div>
            <div className={'text-white'}>Forumo puslapis</div>
            <div className={'flex gap'}>
                <Button onClick={()=>nav('/')}>Main</Button>
                <Button onClick={()=>nav('/login')}>Prisijungti</Button>
                <Button onClick={()=>nav('/register')}>Registracija</Button>
                <Button onClick={()=>nav('/tema/:topic')}>Tema</Button>
            </div>

        </div>
    );
};

export default Header;