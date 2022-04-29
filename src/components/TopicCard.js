import React from 'react';

const TopicCard = ({topic}) => {

    const topicdate = new Date(topic.time)

    return (
        <div className={'topic-card'}>
            <div className={'d-flex justify-content-between'}>
                <div><b>{topic.title}</b></div>
                <div>{ topicdate.toString()}</div>
                <div>{topic.user}</div>
            </div>

            <div>{topic.text}</div>

        </div>
    );
};

export default TopicCard;