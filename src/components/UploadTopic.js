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

    const closeInputs = () => {
        setWrite(!write);
        topicTitleRef.current.value = '';
        topicTextRef.current.value = '';
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
        <div className={'flex-col just-center gap '}>
            <div className={inputsContainerClass}>
                <input type="text" ref={topicTitleRef} placeholder={'Temos pavadinimas...'}/>
                <input type="text" className={'text'} ref={topicTextRef} placeholder={'Temos tekstas...'}/>
            </div>

            <button className={write? 'flex just-spBTW submit active' : ' flex submit just-spBTW'} style={{zIndex:'10'}} onClick={openInputs}>

                {write? 'Paskelbti': 'Kurti naują temą'}

                {write &&
                    <div onClick={closeInputs}>X</div>
                }

            </button>
        </div>
    );
};

export default UploadTopic;