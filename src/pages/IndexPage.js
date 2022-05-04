import React, {useContext, useState, useEffect} from 'react';
import MainContext from "../context/MainContext";
import TopicCard from "../components/TopicCard";
import TopicCardSmall from "../components/TopicCardSmall";
import UploadTopic from "../components/UploadTopic";
import http from "../plugins/http";
import Pagination from "../components/Pagination";



const IndexPage = () => {

    const {topics, setTopics, loggedUser} = useContext(MainContext);

    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [itemsInPage, setItemsInPage] = useState(10)

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

    // useEffect(()=>{
    //     getTopics()
    // },[])

    useEffect(()=>{
        if (!localStorage.getItem('favorites')) {
            const values = [];
            localStorage.setItem('favorites', JSON.stringify(values))
        }
    },[])


    // ===GETTING PAGED TOPICS
    const openPage = (activePage) => {
        const sendData = {
            page: activePage,
            itemsInPage: itemsInPage,
        }
        http.post('/get-paged-topics', sendData).then(res => {
            if (res.success) {
                setTopics(res.reversePagedTopics);
                setTotalPages(res.totalPages);
            }
        })
    }

    return (
        <div className={'container'}>
            <h2>Visos pokalbių temos</h2>
            {loggedUser &&
                <UploadTopic />
            }

            {(topics.length!==0  && totalPages!==1) &&
                <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} setItemsInPage={setItemsInPage}/>
            }

            <div className={'flex just-spBTW container-Small'}
            style={{backgroundColor:"lightgrey"}}>
                <div style={{flex: '2'}}></div>
                <div style={{flex: '9'}}><b>Tema</b></div>
                <div style={{flex: '3'}}>komentarai</div>
                <div style={{flex: '3'}}>Data</div>
                <div style={{flex: '1'}}></div>
            </div>

            <div className={'flex-col'}>
                {topics.map((topic,i)=><TopicCardSmall topic={topic} key={topic._id} />).reverse()}
            </div>
            {/*<div className={'d-flex flex-column'}>*/}
            {/*    {topics.map((topic,i)=><TopicCard topic={topic} key={topic._id} />).reverse()}*/}
            {/*</div>*/}
        </div>
    );
};

export default IndexPage;