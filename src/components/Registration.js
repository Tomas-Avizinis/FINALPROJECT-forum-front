import React, {useEffect, useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const Registration = () => {

    const nav = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('text-danger')

    const [nameClass, setNameClass] = useState('border-danger')
    const [pass1Class, setPass1Class] = useState('border-danger')
    const [pass2Class, setPass2Class] = useState('border-danger')
    const [emailClass, setEmailClass] = useState('border-danger')
    const [photoClass, setPhotoClass] = useState('border-danger')

    const nameRef = useRef();
    const pass1Ref = useRef();
    const pass2Ref = useRef();
    const emailRef = useRef();
    const photoRef = useRef();


    const validateUser = () => {
        setIsSubmitted(true);

        if (nameRef.current.value.length >= 3 && nameRef.current.value.length <= 20)
            setNameClass('good')
        else setNameClass('bad')

        if (pass1Ref.current.value.length >= 3 && pass1Ref.current.value.length <= 20)     setPass1Class('good')
        else setPass1Class('bad')

        if (pass1Ref.current.value === pass2Ref.current.value && pass2Ref.current.value !=='')     setPass2Class('good')
        else setPass2Class('bad')

        if (emailRef.current.value.includes('@'))
            setEmailClass('good')
        else setEmailClass('bad')

        if (photoRef.current.value.startsWith('http'))
            setPhotoClass('good')
        else setPhotoClass('bad')
    }


    const submitUser = () => {
        if (nameRef.current.value.length < 3 ||
            nameRef.current.value.length > 20 ||
            pass1Ref.current.value.length < 3 ||
            pass1Ref.current.value.length > 20 ||
            pass1Ref.current.value !== pass2Ref.current.value ||
            pass2Ref.current.value ==='' ||
            !emailRef.current.value.includes('@') ||
            !photoRef.current.value.startsWith('http')
        ) {
            setMessageClass('text-danger')
            setMessage('Užpildykite visus laukelius')
                return
            }
        else {
            setMessage('')
        }

        const newUser = {
            username: nameRef.current.value,
            password1: pass1Ref.current.value,
            password2: pass2Ref.current.value,
            email: emailRef.current.value,
            photo: photoRef.current.value,
        }

        http.post('/register', newUser).then(res => {
            console.log(res)
            if (res.success) {
                console.log('OK', res.user)
                setMessageClass('text-success')
                setMessage('Vartotojas užregistruotas')
                nav('/login');
            } else {
                setMessageClass('text-danger')
                setMessage(res.message)
            }
        })
    }

    return (
        <div className={'container'}>
            <div className={'flex flex-col gap'}>
                    <div>Įveskite savo duomenis</div>
                    <input type="text" ref={nameRef} placeholder={'Vartotojo vardas...'} className={isSubmitted && nameClass} />
                    <input type="password" ref={pass1Ref} placeholder={'Slaptažodis...'} className={isSubmitted && pass1Class}/>
                    <input type="password" ref={pass2Ref} placeholder={'pakartokite slaptažodį...'} className={isSubmitted && pass2Class}/>
                    <input type="email" ref={emailRef} placeholder={'el.paštas...'} className={isSubmitted && emailClass}/>
                    <input type="text" ref={photoRef} placeholder={'Nuotrauka (url)...'} className={isSubmitted && photoClass}/>

                    <Button onClick={()=> {
                        validateUser();
                        submitUser();
                    }} className={'submit active'}>Registruotis</Button>
                    <div className={messageClass}>{message}</div>
                </div>
        </div>
    );
};

export default Registration;