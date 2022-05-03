import React, {useEffect, useContext} from 'react';
import http from "../plugins/http";
import TopicCard from "../components/TopicCard";
import MainContext from "../context/MainContext";

const FavoritesPage = () => {

    const favoriteIds = JSON.parse(localStorage.getItem('favorites'))
    const {topics, setTopics} = useContext(MainContext);

    useEffect(()=>{
        getFavorites();
    },[])

    useEffect(()=>{
        getFavorites();
    },[JSON.parse(localStorage.getItem('favorites'))])

    const getFavorites = () => {
        const favorites = {
            favorites: favoriteIds
        }
        if (favoriteIds.length) {
            http.post('/get-favorites', favorites).then(res => {
                if (res.success) {
                    setTopics(res.favoriteTopics)
                }
            })
        }
    }

    return (
        <div className={'container'}>
            <h2>Mėgstamiausios temos</h2>
            {(favoriteIds.length >0) &&
                <>
                    <div className={'d-flex flex-column'}>
                        {topics.map((topic)=><TopicCard topic={topic} key={topic._id}/>)}
                    </div>
                </>
            }
            {(favoriteIds.length === 0) &&
                <div>Neturite megiamu temu</div>
            }
        </div>
    );
};

export default FavoritesPage;