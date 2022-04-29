import React, {useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import http from "../plugins/http";

const Registration = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputStatus, setInputStatus] = useState('')


    const nameRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const photoRef = useRef();

    const tomas = {
        username: 'tomas',
        password: 'aaaa',
        email: 'tomas@aa.com',
        photo: 'https://i.pinimg.com/originals/b7/d8/f0/b7d8f0520835df9547ce82ab56955110.jpg'
    }

    const isValid = (input) => {
        let success;
        if (input === 'name') success = Boolean(nameRef.current.value.length > 2 && nameRef.current.value.length < 25)
        else if (input === 'password') success = Boolean(passRef.current.value.length > 2 && passRef.current.value.length < 25)
        else if (input === 'email') success = Boolean(emailRef.current.value.includes('@'))
        else if (input === 'photo') success = Boolean(photoRef.current.value.startsWith('http'))
        return success? 'no-border':'border-danger'
    }

    const addUser = () => {

        setIsSubmitted(true);

        if (isValid('name') === 'border-danger' ||
            isValid('password') === 'border-danger' ||
            isValid('email') === 'border-danger'||
            isValid('photo') === 'border-danger') {
            setInputStatus('Pataisykite paryskintus langelius')
            return
        }
        else console.log('ivesta tinkamai, galime saugoti useri')


        //reikia antro passwordsss
        const newUser = {
            username: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
            photo: photoRef.current.value,
        }

        console.log('naujas useris', newUser)

        http.post('/register', newUser).then(res => {
            console.log(res)
            if (res.success) {
                console.log('OK', res.user)
            } else {

            }
            if (res.message === "Neteisingi prisijungimo duomenys") {
            }
        })
    }


    return (
        <div className={'registration'}>
            <div className={'d-flex flex-column gap-2 w-50 p-5'}>
                <div>Įveskite savo duomenis registracijai</div>
                <input type="text" ref={nameRef} placeholder={'Vartotojo vardas...'} className={isSubmitted ? isValid('name') : 'no-border'}/>
                <input type="password" ref={passRef} placeholder={'Slaptažodis...'} className={isSubmitted ? isValid('password') : 'no-border'}/>
                <input type="email" ref={emailRef} placeholder={'el.paštas...'} className={isSubmitted ? isValid('email') : 'no-border'}/>
                <input type="text" ref={photoRef} placeholder={'Nuotrauka (url)...'} className={isSubmitted ? isValid('photo') : 'no-border'}/>
                <Button onClick={addUser}>Įvesti</Button>
                <div className={'text-danger'}>{inputStatus}</div>
            </div>

        </div>
    );
};

export default Registration;