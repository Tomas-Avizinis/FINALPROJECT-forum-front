import React, {useContext} from 'react';
import MainContext from "../context/MainContext";

const CommentCard = ({comment}) => {

    const {fullDate} = useContext(MainContext);

    return (
        <div className={'comment-card'}>
            <div className={'d-flex justify-content-between comment-info'} >
                <div>Autorius: <b>{comment.author}</b></div>
                <div>&#128337; {fullDate(comment.time)}</div>
            </div>
            <div className={'comment-text'}>{comment.text}</div>
            <div className={'flex wrap'}>
                {comment.links &&
                    <>
                        {comment.links.map((link, i) =>
                            <div className={'comment-link'} key={link} style={{backgroundImage: `url('${link}')`}}></div>
                        )}
                    </>
                }
                {comment.videolinks &&
                    <>
                        {comment.videolinks.map((link, i) =>
                            <iframe key={link} className={'comment-video'} src={`//www.youtube.com/embed/${link}`}  allowFullScreen></iframe>
                        )}
                    </>
                }
            </div>



        </div>
    );
};

export default CommentCard;