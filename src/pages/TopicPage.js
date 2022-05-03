import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import TopicCard from "../components/TopicCard";
import http from "../plugins/http";
import UploadComment from "../components/UploadComment";
import MainContext from "../context/MainContext";
import CommentCard from "../components/CommentCard";
import Pagination from "../components/Pagination";


const TopicPage = () => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(false)

    const [singleTopic, setSingleTopic] = useState();
    const {topicIdTitle} = useParams();

    const topicId = topicIdTitle.split('_')[0];

    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [itemsInPage, setItemsInPage] = useState(4);



    useEffect(()=>{
        getPagedComments(activePage)
    },[])

    useEffect(()=>{
        getPagedComments(activePage)
    },[activePage])

    useEffect(()=>{
        setActivePage(1)
        getPagedComments(1)
    },[itemsInPage])

    useEffect(()=>{
        getSingleTopic();
        setNewComment(false);
    },[]);

    useEffect(()=>{
        getSingleTopic();
        getPagedComments(1);
        setActivePage(1);
        setNewComment(false);
    },[newComment]);


    const getSingleTopic = () => {
        http.post('/get-single-topic', {topicId: topicId}).then(res => {
            if (res.success) {
                setSingleTopic(res.singleTopic)
                // setComments(res.comments)
            }
        })
    }

    const getPagedComments = (activePage) => {

        const sendData = {
            topicId: topicId,
            page: activePage,
            itemsInPage: itemsInPage,
        }

        http.post('/get-paged-comments', sendData).then(res => {
            if (res.success) {
                setComments(res.reversePagedComments);
                setTotalPages(res.totalPages);
            }
        })
    }

    return (
        <div className={'container'}>
            {singleTopic &&
                <div>
                    <h2>TEMA: <b>{singleTopic.title}</b></h2>
                    <TopicCard topic={singleTopic}/>
                    <UploadComment topicId={singleTopic._id} setNewComment={setNewComment} />

                    {(comments.length!==0  && totalPages!==1) &&
                        <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} setItemsInPage={setItemsInPage}/>
                    }

                    {comments &&
                        <>
                            {comments.map((comment) =>
                                <CommentCard comment={comment} key={comment._id}/>
                            ).reverse()}
                        </>
                    }
                </div>
            }
        </div>
    );
};

export default TopicPage;