import React, {useContext, useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import http from "../plugins/http";
import MainContext from "../context/MainContext";


const Login = () => {

    const {setLoggedUser} = useContext(MainContext);

    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('text-danger')
    const [stayLogged, setStayLogged] = useState(false);

    const nameRef = useRef();
    const passRef = useRef();
    const stayLoggedRef = useRef();

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
            } else {
                setMessageClass('text-danger')
                setMessage(res.message)
            }
        })
    }


    return (
        <div>
            <div className={'registration'}>
                <div className={'d-flex flex-column gap-2 w-50 p-5'}>
                    <div>Prisijunkite</div>
                    <input type="text" ref={nameRef} placeholder={'Vartotojo vardas...'}  className={'no-border'}/>
                    <input type="password" ref={passRef} placeholder={'Slaptažodis...'} className={'no-border'}/>
                    <div className={'d-flex justify-content-center align-items-center gap-2'}>
                        <input type="checkbox" onClick={() => setStayLogged(!stayLogged)}/>
                        <div>Likti prisijungus</div>
                    </div>

                    <Button onClick={()=> {
                        loginUser();
                    }}>Prisijungti</Button>
                    <div className={messageClass}>{message}</div>
                </div>

            </div>
        </div>
    );
};

export default Login;