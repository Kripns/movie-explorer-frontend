import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { currentUser, cards } from '../../utils/constants';
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import Preloader from '../Preloader/Preloader';

function App() {

  const [ isLoading, setIsLoading ] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  
  const isHeaderVisible = 
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const isFooterVisible =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  return (
    <div className='app'>
      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/movies' element={<Movies cards={cards}/>} />
        <Route path='/saved-movies' element={<SavedMovies cards={cards}/>} />
        <Route path='/profile' element={<Profile user={currentUser} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      {isFooterVisible && <Footer />}
      {isLoading && <Preloader />}
    </div>
  );
}

export default App;
