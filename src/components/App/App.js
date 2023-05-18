import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  register,
  login,
  checkToken,
  saveMovie,
  deleteMovie,
  getSavedMovies,
} from '../../utils/MainApi';


function App() {
  // Переменные состояния
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiUrl = 'https://api.nomoreparties.co';

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
    setIsLoading(true);
    return getSavedMovies()
      .then(movies => {
        setSavedMovies(movies)
        // console.log('saved', savedMovies)
        // console.log('movies', movies)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  //Обработчики

  function handleRegister(name, email, password) {
    if (!name || !email || !password) return;
    return register(name, email, password)
      .then(res => {
        if (res) {
          handleLogin(email, password);
        } else {
          Promise.reject(new Error(`Произошла ошибка ${res.status}`));
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogin(email, password) {
    if (!email || !password) return;
    return login(email, password)
      .then(res => {
        if (res.token) {
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setAllMovies([]);
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate('/signin');
  }

  function searchMovies(movies, searchValue, checkboxValue) {
    const foundMovies = movies.filter(movie =>
      movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
    );
    const filteredMovies = checkboxValue
      ? foundMovies.filter(movie => Number(movie.duration) <= 40)
      : foundMovies;

    setMoviesToRender(filteredMovies.map(movie => {
      return {
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        duration: movie.duration,
        director: movie.director,
        year: movie.year,
        description: movie.description,
        image: `${apiUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${apiUrl}${movie.image.formats.thumbnail.url}`,
        id: movie.id,
        movieId: movie.id,
        // isSaved: savedMovies.some(m => m.movieId === movie.id)
      };
    }))
    console.log('moviesToRender', moviesToRender)
    console.log('savedMovies', savedMovies)
  }

  function handleSearchMovies(searchValue, checkboxValue) {
    if (allMovies.length) { 
      return searchMovies(allMovies, searchValue, checkboxValue)
    }
    else {
      setIsLoading(true);
      return getMovies()
        .then(movies => {
          setAllMovies(movies);
          searchMovies(movies, searchValue, checkboxValue)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }

  function handleSearchSavedMovies(searchValue, checkboxValue) {
    const foundMovies = savedMovies.filter(movie =>
      movie['nameRU'].toLowerCase().includes(searchValue.toLowerCase())
    );
    const filteredMovies = checkboxValue
      ? foundMovies.filter(movie => Number(movie.duration) <= 40)
      : foundMovies;

    return setSavedMovies(filteredMovies);
  }

  function handleSaveMovie({ nameRU, nameEN, country, duration, director, year, description, image, trailerLink, thumbnail, movieId }) {
    setIsLoading(true);
    saveMovie({ nameRU, nameEN, country, duration, director, year, description, image, trailerLink, thumbnail, movieId })
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  //Обработчик удаления карточки
  function handleDeleteMovie(movie) {
    setIsLoading(true);
    const movieToDelete = savedMovies.find(m => movie.movieId === m.movieId)
    deleteMovie(movieToDelete._id)
      .then(removedMovie => {
        setSavedMovies(state =>
          state.filter(item => item._id !== removedMovie._id)
        );
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (!localStorage.getItem('jwt')) return;
    checkToken()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        } else {
          setIsLoggedIn(false);
          setCurrentUser({});
          navigate('/signin');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    isLoggedIn && updateSavedMovies()
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path='/' element={<Content />} />
          <Route
            path='/movies'
            element={
              <Movies
                moviesToRender={moviesToRender}
                savedMovies={savedMovies}
                handleSearchSubmit={handleSearchMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <SavedMovies
                moviesToRender={moviesToRender}
                savedMovies={savedMovies}
                handleSearchSubmit={handleSearchSavedMovies}
                handleDeleteMovie={handleDeleteMovie}
                updateSavedMovies={updateSavedMovies}
              />
            }
          />
          <Route
            path='/profile'
            element={<Profile user={currentUser} handleLogout={handleLogout} />}
          />
          <Route
            path='/signup'
            element={<Register handleSubmit={handleRegister} />}
          />
          <Route
            path='/signin'
            element={<Login handleSubmit={handleLogin} />}
          />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        {isFooterVisible && <Footer />}
        {isLoading && <Preloader />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
