import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import MainContext from "./context/MainContext";
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import TopicPage from "./pages/TopicPage";
import {useState} from "react";



function App() {

    const [topics, setTopics] = useState([])
    // const [comments, setComments] = useState([]);
    const [loggedUser, setLoggedUser] = useState('')

    const fullDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = (date.getHours()<10 && '0') + date.getHours();
        const minutes = (date.getMinutes()<10 && '0') + date.getMinutes();
        return `${date.toLocaleDateString()} ${hours}:${minutes}`
    }



  return (
      <MainContext.Provider value={{
        topics, setTopics,
        loggedUser, setLoggedUser,
        fullDate,
      }}>

        <BrowserRouter>

          <Header />
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/tema/:topicIdTitle' element={<TopicPage />} />
          </Routes>

        </BrowserRouter>

      </MainContext.Provider>
  );
}

export default App;
