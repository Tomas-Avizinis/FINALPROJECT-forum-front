import React, {useContext, useRef} from 'react';
import http from "../plugins/http";
import MainContext from "../context/MainContext";


const UploadComment = ({topicId, setNewComment}) => {

    const {loggedUser} = useContext(MainContext);

    const commentRef = useRef();

    const addComment = () => {
        if (!loggedUser) return
        const newComment = {
            userId: loggedUser._id,
            topicId: topicId,
            text: commentRef.current.value,
        }

        http.post('/upload-comment', newComment).then(res => {
            if (res.success) {
                console.log('komentaras issaugotas')
                setNewComment(true)
                // setComments(res.allComments)
            } else {

            }
        })
    }



    return (
        <div>
            <input type="text" ref={commentRef} placeholder={'Rašykite tekstą...'}/>
            <button onClick={addComment}>Naujas įrašas</button>
        </div>
    );
};

export default UploadComment;