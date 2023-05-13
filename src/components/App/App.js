import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import getMovies from '../../utils/MoviesApi';
import { register, login, saveMovie, deleteMovie, getSavedMovies } from '../../utils/MainApi';

function App() {

// Переменные состояния
  const [cards, setCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isHeaderVisible =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile';

  const isFooterVisible =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  function updateSavedMovies() {
    return getSavedMovies()
      .then(movies => setSavedMovies(movies))
      .catch(err => console.log(err))
  };

//Обработчики
  // function handleSaveMovie(data) {
  //   return saveMovie(data)
  //     .then(() => setIsMovieSaved(true))
  //     .catch(err => console.log(err))
  // }

  // function handleDeleteMovie(data) {
  //   return deleteMovie(data.movieId)
  //     .then(() => setIsMovieSaved(false))
  //     .catch(err => console.log(err))
  // }

  // function handleLikeClick(data, isMovieSaved) {
  //   return isMovieSaved ? handleDeleteMovie(data) : handleSaveMovie(data);
  // }

  function handleRegister(name, email, password) {
    if(!name || !email || !password) return;
    
    return register(name, email, password)
      .then(res => {
        if(res) {
          handleLogin(email, password)
        } else {
        Promise.reject(new Error(`Произошла ошибка ${res.status}`));
      }
    })
      .catch(err => console.log(err))
  };

  function handleLogin(email, password) {
    if(!email || !password) return;

    return login(email, password)
      .then(res => {
        if(res.token) {
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch(err => console.log(err));
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  function handleSearchMovies(searchValue, checkboxValue) {
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

  function handleSearchSavedMovies(searchValue, checkboxValue) {
        const foundMovies = savedMovies.filter(movie => 
          movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
        );
        const filteredMovies = checkboxValue
          ? foundMovies.filter(movie => Number(movie.duration) <= 40)
          : foundMovies;

        return setSavedMovies(filteredMovies)
        // return filteredMovies;
  }

  return (
    <div className='app'>
      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Content />} />
        <Route
          path='/movies'
          element={
            <Movies 
              cards={cards}
              handleSearchSubmit={handleSearchMovies}
              // handleButtonClick={handleLikeClick}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies 
              cards={savedMovies}
              handleSearchSubmit={handleSearchSavedMovies}
              // handleButtonClick={handleDeleteMovie}
              updateSavedMovies={updateSavedMovies}
            />
          }
        />
        <Route path='/profile' element={<Profile user={currentUser} handleLogout={handleLogout}/>} />
        <Route path='/signup' element={<Register handleSubmit={handleRegister}/>} />
        <Route path='/signin' element={<Login handleSubmit={handleLogin}/>} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      {isFooterVisible && <Footer />}
      {isLoading && <Preloader />}
    </div>
  );
}

export default App;
