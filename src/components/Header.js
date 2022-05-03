import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";
import http from "../plugins/http";

const Header = () => {

    const nav = useNavigate();
    const {loggedUser, setLoggedUser} = useContext(MainContext)

    useEffect(()=>{
        isUserLogged()
    },[])

    const isUserLogged = () => {
        if (localStorage.getItem('stayLogged') === 'true') {
            const user = {
                userId: localStorage.getItem('userId')
            }
            http.post('/loggedUser', user).then(res => {
                if (res.success) {
                    setLoggedUser(res.user)
                } else {
                    console.log('useris nerastas')
                }
            })
        }
    }

    const logOut = () => {
        setLoggedUser('');

    }

    const navigateToUserPage = () => {
        nav('/user/'+ loggedUser.username)
    }

    return (
        <div className={'Header flex gap wrap justify-content-between align-items-center'}>
            <div className={'animated-logo'} onClick={()=>nav('/')} />
            <div className={'flex gap wrap'}>

                {!loggedUser &&
                    <>
                        <button onClick={()=>nav('/login')}>Prisijungti</button>
                        <button onClick={()=>nav('/register')}>Registracija</button>
                    </>
                }
                <button onClick={()=>nav('/favorites')}>Mėgstamiausi</button>

                {loggedUser &&
                    <button onClick={logOut}>Atsijungti</button>
                }



                {loggedUser &&
                    <div className={'text-white'} onClick={navigateToUserPage}><b>Hi, {loggedUser.username}</b></div>
                }
            </div>

        </div>
    );
};

export default Header;