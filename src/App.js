
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContext from "./context/MainContext";
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopicPage from "./pages/TopicPage";
import {useEffect, useState} from "react";




function App() {

  const [topics, setTopics] = useState([])

  useEffect(()=>{
    console.log('Temos', topics)
  },[topics])

  return (
      <MainContext.Provider value={{
        topics,
        setTopics
      }}>

        <BrowserRouter>

          <Header />
          <div>FORUMAS pagrindinis puslapis</div>
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/tema/:topic' element={<TopicPage />} />
          </Routes>

        </BrowserRouter>

      </MainContext.Provider>
  );
}

export default App;
