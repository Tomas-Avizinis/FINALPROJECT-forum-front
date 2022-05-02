import React, {useContext, useRef} from 'react';
import MainContext from "../context/MainContext";
import http from "../plugins/http";

const UploadTopic = () => {

    const {topics, setTopics, loggedUser} = useContext(MainContext);

    const topicTitleRef = useRef();
    const topicTextRef = useRef();

    const addTopic = () => {
        if (!loggedUser) return
        const newTopic = {
            userId: loggedUser._id,
            title: topicTitleRef.current.value,
            text: topicTextRef.current.value,
        }

        http.post('/upload-topic', newTopic).then(res => {
            if (res.success) {
                setTopics(res.allTopics)
            } else {

            }
        })

    }

    return (
        <div className={'d-flex flex-column gap w-50'}>
            <input type="text" ref={topicTitleRef} placeholder={'Temos pavadinimas...'}/>
            <input type="text" ref={topicTextRef} placeholder={'Temos tekstas...'}/>
            <button onClick={addTopic}>Ivesti</button>
        </div>
    );
};

export default UploadTopic;