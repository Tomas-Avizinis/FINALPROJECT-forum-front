import React, {useContext, useState, useEffect} from 'react';
import MainContext from "../context/MainContext";
import TopicCard from "../components/TopicCard";
import UploadTopic from "../components/UploadTopic";
import http from "../plugins/http";
import Pagination from "../components/Pagination";



const IndexPage = () => {

    const {topics, setTopics} = useContext(MainContext);

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
            <h2>Visos pokalbių temos kokios tik gali šauti į galvą</h2>
            <UploadTopic />
            {(topics.length!==0  && totalPages!==1) &&
                <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} setItemsInPage={setItemsInPage}/>
            }
            <div className={'d-flex flex-column'}>
                {topics.map((topic,i)=><TopicCard topic={topic} key={topic._id} />).reverse()}
            </div>
        </div>
    );
};

export default IndexPage;