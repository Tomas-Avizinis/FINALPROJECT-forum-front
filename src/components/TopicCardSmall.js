import React, {useContext, useEffect, useState} from 'react';
import MainContext from "../context/MainContext";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";

const TopicCardSmall = ({topic, comments}) => {

    const nav = useNavigate();
    const {fullDate} = useContext(MainContext);
    const [favorite, setFavorite] = useState(false);
    const [topicUser, setTopicUser] = useState();
    const favoriteClass = favorite? 'favorite-sm' : 'not-favorite-sm'

    const getUser = (userId) => {
        const user = {userId: userId}
        http.post('/get-user', user).then(res => {
            if (res.success) {
                setTopicUser(res.user)
            }
        })
    }

    useEffect(()=>{
        getUser(topic.authorId)
    },[])

    const navigateToTopic = () => {
        const shortTitle = topic.title.replace(' ', '_').toLowerCase()
        nav('/tema/'+ topic._id + '_' + shortTitle)
    }
    useEffect(()=>{
        const values = JSON.parse(localStorage.getItem('favorites'));
        if (values.includes(topic._id)) setFavorite(true)
    },[])

    const handleFavorites = () => {
        setFavorite(!favorite);

        if (!localStorage.getItem('favorites')) {
            const values = [];
            values[0] = topic._id
            localStorage.setItem('favorites', JSON.stringify(values))
        } else {
            const values = JSON.parse(localStorage.getItem('favorites'))

            if (values.includes(topic._id)) {
                const index = values.indexOf(topic._id)
                values.splice(index,1)
            } else {
                values.push(topic._id)
            }
            localStorage.setItem('favorites', JSON.stringify(values));
        }
    }

    return (
        <div className={'flex just-spBTW container-Small'} onClick={navigateToTopic}>
            {topicUser &&
                <div className={'flex-col'} style={{flex: '2'}}>
                    <img className={'user-picture'} src={topicUser.photo} alt=""/>
                    <div>{topicUser.username}</div>
                </div>
            }
            <div  style={{flex: '10'}}><b>{topic.title}</b></div>
            <div  style={{flex: '2'}}>{topic.comments}</div>
            <div style={{flex: '3'}}>{fullDate(topic.time)}</div>
            <div style={{flex: '1'}} onClick={(e)=>{
                e.stopPropagation();
                handleFavorites();
            }} className={favoriteClass}>🗹</div>
        </div>
        //🎔
    );
};

export default TopicCardSmall;