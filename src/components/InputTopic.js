import React, {useContext, useRef} from 'react';
import MainContext from "../context/MainContext";

const InputTopic = () => {

    const {topics, setTopics} = useContext(MainContext);

    const topicTitleRef = useRef();
    const topicTextRef = useRef();

    const addPost = () => {
        const newTopic = {
            user: 'no user',
            title: topicTitleRef.current.value,
            text: topicTextRef.current.value,
            time: Date.now(),
        }

        setTopics([...topics, newTopic]);

    }

    return (
        <div className={'d-flex flex-column gap w-50'}>
            <input type="text" ref={topicTitleRef}/>
            <input type="text" ref={topicTextRef}/>
            <input type="Submit "/>
            <button onClick={addPost}>Ivesti</button>
        </div>
    );
};

export default InputTopic;