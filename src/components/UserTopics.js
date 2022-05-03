import React, {useContext, useEffect, useState} from 'react';
import MainContext from "../context/MainContext";
import http from "../plugins/http";
import Pagination from "./Pagination";
import TopicCard from "./TopicCard";

const UserTopics = ({userName}) => {

    const {topics, setTopics, loggedUser} = useContext(MainContext);

    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [itemsInPage, setItemsInPage] = useState(5)

    useEffect(()=>{
        openPage(activePage)
    },[])

    useEffect(()=>{
        openPage(activePage)
    },[activePage])

    useEffect(()=>{
        setActivePage(1)
        openPage(1)
    },[itemsInPage])

    // ===GETTING PAGED USER TOPICS
    const openPage = (activePage) => {
        const sendData = {
            page: activePage,
            itemsInPage: itemsInPage,
            userId: loggedUser._id,
        }
        http.post('/get-user-topics', sendData).then(res => {
            if (res.success) {
                setTopics(res.reversePagedTopics);
                setTotalPages(res.totalPages);
            }
        })
    }

    return (

        <div className={'container'}>

                {(topics.length!==0  && totalPages!==1) &&
                    <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} setItemsInPage={setItemsInPage}/>
                }

                {(topics.length ===0) &&
                    <div>
                        <h2>Jūs neturite sukurtų temų.</h2>
                    </div>
                }

                {(topics.length !==0) &&
                    <div className={'d-flex flex-column'}>
                        {topics.map((topic,i)=><TopicCard topic={topic} key={topic._id} />).reverse()}
                    </div>
                }

            </div>

    );
};

export default UserTopics;