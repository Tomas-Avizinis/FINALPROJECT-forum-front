import React, {useContext, useEffect, useRef, useState} from 'react';
import MainContext from "../context/MainContext";
import http from "../plugins/http";

const UploadTopic = () => {

    const {topics, setTopics, loggedUser} = useContext(MainContext);

    const [write, setWrite] = useState(false);
    const [inputsContainerClass, setContainerInputsClass] = useState('inputs-closed')
    const topicTitleRef = useRef();
    const topicTextRef = useRef();

    const openInputs = () => {
        setWrite(!write);
        if (write && topicTitleRef.current.value !=='' && topicTitleRef.current.value !=='') {
            addTopic();
        } else {
            topicTitleRef.current.value = '';
            topicTextRef.current.value = '';
            console.log('nera teksto, nebus ir naujos temos')
        }
    }

    useEffect(()=>{
        setContainerInputsClass(write? 'container-open': 'container-closed')
    },[write])


    const addTopic = () => {
        if (!loggedUser) return
        const newTopic = {
            userId: loggedUser._id,
            title: topicTitleRef.current.value,
            text: topicTextRef.current.value,
        }

        http.post('/upload-topic', newTopic).then(res => {
            if (res.success) {
                setTopics(res.allTopics);
                topicTitleRef.current.value = '';
                topicTextRef.current.value = '';
            } else {
                console.log(res.message)
            }

        })
    }

    return (
        <div className={'flex-column justify-content-center gap w-50'}>
            <div className={inputsContainerClass}>
                <input type="text" ref={topicTitleRef} placeholder={'Temos pavadinimas...'}/>
                <input type="text" className={'text'} ref={topicTextRef} placeholder={'Temos tekstas...'}/>
            </div>

            <button className={write? 'submit active' : 'submit'} onClick={openInputs}>
                {write? 'Paskelbti': 'Kurti naują temą'}</button>
        </div>
    );
};

export default UploadTopic;