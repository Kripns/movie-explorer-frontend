import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { currentUser } from '../../utils/constants';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cards, setCards] = useState([]);
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

  function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  function handleSearchSubmit(searchValue, checkboxValue) {
    return getMovies()
      .then(movies => {
        const foundMovies = movies.filter(movie => 
          movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
        );
        const filteredMovies = checkboxValue
          ? foundMovies.filter(movie => Number(movie.duration) <= 40)
          : foundMovies;

        setCards(filteredMovies);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='app'>
      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Content />} />
        <Route
          path='/movies'
          element={<Movies cards={cards} handleSubmit={handleSearchSubmit} />}
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies cards={cards} handleSubmit={handleSearchSubmit} />
          }
        />
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
