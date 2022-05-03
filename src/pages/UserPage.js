import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MainContext from "../context/MainContext";
import UploadTopic from "../components/UploadTopic";
import Pagination from "../components/Pagination";
import TopicCard from "../components/TopicCard";
import http from "../plugins/http";
import UserTopics from "../components/UserTopics";
import UserComments from "../components/UserComments";


const UserPage = () => {

    const {userName} = useParams();
    const [page, setPage] = useState('topics')

    return (
        <div >

            <div className={'flex gap container'}>
                <button className={'user-links'} onClick={()=>setPage('topics') }>Sukurtos temos</button>
                <button className={'user-links'} onClick={()=>setPage('comments') }>Komentuotos temos</button>
            </div>

            {(page === 'topics') &&
                <UserTopics userName={userName}/>
            }
            {(page === 'comments') &&
                <UserComments userName={userName}/>
            }

        </div>
    );
};

export default UserPage;