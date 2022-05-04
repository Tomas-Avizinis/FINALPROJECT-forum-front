import React, {useContext, useRef, useState} from 'react';
import http from "../plugins/http";
import MainContext from "../context/MainContext";
import {useNavigate} from "react-router-dom";


const Login = () => {

    const nav = useNavigate();

    const {setLoggedUser} = useContext(MainContext);

    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('text-danger')
    const [stayLogged, setStayLogged] = useState(false);

    const nameRef = useRef();
    const passRef = useRef();

    const loginUser = () => {
        const user = {
            username: nameRef.current.value,
            password: passRef.current.value,
        }

        http.post('/login', user).then(res => {
            console.log(res)
            if (res.success) {
                setMessageClass('text-success')
                setMessage('Sėkmingai prisijungėte')
                setLoggedUser(res.user)
                if (stayLogged) {
                    localStorage.setItem('stayLogged', "true")
                    localStorage.setItem('userId', res.user._id)
                } else {
                    localStorage.removeItem('stayLogged')
                    localStorage.removeItem('userId')
                }
                nav('/')
            } else {
                setMessageClass('text-danger')
                setMessage(res.message)
            }
        })
    }


    return (
        <div className={'container'}>
            <div className={'flex-col gap'}>
                    <div>Prisijunkite</div>
                    <input  type="text" ref={nameRef} placeholder={'Vartotojo vardas...'}  />
                    <input  type="password" ref={passRef} placeholder={'Slaptažodis...'} />

                    <div className={'flex'}>
                        <input type="checkbox" onClick={() => setStayLogged(!stayLogged)}/>
                        <div>Likti prisijungus</div>
                    </div>


                    <button className={'submit active'} onClick={()=> {
                        loginUser();
                    }}>Prisijungti</button>
                    <div className={messageClass}>{message}</div>
                </div>
        </div>
    );
};

export default Login;