import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";

const TopicCard = ({topic}) => {

    const {fullDate} = useContext(MainContext);
    const [favorite, setFavorite] = useState(false);
    const favoriteClass = favorite? 'favorite' : 'not-favorite'

    const nav = useNavigate();
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
        <div className={'topic-card'} onClick={navigateToTopic}>
            <div className={'d-flex justify-content-between'}>
                <div><b>🗪 {topic.title}</b></div>
                <div>&#128337; {fullDate(topic.time)}  </div>
                <div onClick={(e)=>{
                    e.stopPropagation();
                    handleFavorites();
                }} className={favoriteClass}>🎔</div>
                <div>Sukūrė: {topic.author}</div>
            </div>

            <div>🖹 {topic.text}</div>

            <div className={'flex wrap'}>
                {topic.links &&
                    <>
                        {topic.links.map((link, i) =>
                            <div className={'comment-link'} key={link} style={{backgroundImage: `url('${link}')`}}></div>
                        )}
                    </>
                }
                {topic.videolinks &&
                    <>
                        {topic.videolinks.map((link, i) =>
                            <iframe key={link} className={'comment-video'} src={`//www.youtube.com/embed/${link}`}  allowFullScreen></iframe>
                        )}
                    </>
                }
            </div>

        </div>
    );
};

export default TopicCard;