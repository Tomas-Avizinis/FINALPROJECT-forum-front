import React, {useContext} from 'react';
import MainContext from "../context/MainContext";
import TopicCard from "../components/TopicCard";

const IndexPage = () => {

    const {topics, setTopics} = useContext(MainContext);

    return (
        <div>
            <h1>Index page, all topic will be here</h1>
            <div className={'d-flex flex-column'}>
                {topics.map((topic,i)=><TopicCard topic={topic} key={i}/>)}
            </div>
        </div>
    );
};

export default IndexPage;