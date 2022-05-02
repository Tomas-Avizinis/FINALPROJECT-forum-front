import React, {useEffect, useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import http from "../plugins/http";

const Registration = () => {

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
            setNameClass('border-success')
        else setNameClass('border-danger')

        if (pass1Ref.current.value.length >= 3 && pass1Ref.current.value.length <= 20)     setPass1Class('border-success')
        else setPass1Class('border-danger')

        if (pass1Ref.current.value === pass2Ref.current.value && pass2Ref.current.value !=='')     setPass2Class('border-success')
        else setPass2Class('border-danger')

        if (emailRef.current.value.includes('@'))
            setEmailClass('border-success')
        else setEmailClass('border-danger')

        if (photoRef.current.value.startsWith('http'))
            setPhotoClass('border-success')
        else setPhotoClass('border-danger')
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
            setMessage('Pataisykite paryskintus langelius')
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
            } else {
                setMessageClass('text-danger')
                setMessage(res.message)
            }
        })
    }

    return (
        <div className={'registration'}>
            <div className={'d-flex flex-column gap-2 w-50 p-5'}>
                <div>Įveskite savo duomenis registracijai</div>
                <input type="text" ref={nameRef} placeholder={'Vartotojo vardas...'} className={isSubmitted ? nameClass : 'no-border'} />
                <input type="password" ref={pass1Ref} placeholder={'Slaptažodis...'} className={isSubmitted ? pass1Class : 'no-border'}/>
                <input type="password" ref={pass2Ref} placeholder={'pakartokite slaptažodį...'} className={isSubmitted ? pass2Class : 'no-border'}/>
                <input type="email" ref={emailRef} placeholder={'el.paštas...'} className={isSubmitted ? emailClass : 'no-border'}/>
                <input type="text" ref={photoRef} placeholder={'Nuotrauka (url)...'} className={isSubmitted ? photoClass : 'no-border'}/>

                <Button onClick={()=> {
                    validateUser();
                    submitUser();
                }}>Įvesti</Button>
                <div className={messageClass}>{message}</div>
            </div>

        </div>
    );
};

export default Registration;