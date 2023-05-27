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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import getMovies from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  register,
  login,
  editProfile,
  checkToken,
  saveMovie,
  deleteMovie,
  getSavedMovies,
} from '../../utils/MainApi';
import { filterMovies } from '../../utils/functions';

function App() {
  // Переменные состояния
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resStatus, setResStatus] = useState(false);
  const [isInit, setIsInit] = useState(false);

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
      .then(movies => setSavedMovies(movies))
      .catch(err => setResStatus(err))
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
          Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
      })
      .catch(err => setResStatus(err));
  }

  function handleLogin(email, password) {
    if (!email || !password) return;
    return login(email, password)
      .then(res => {
        if (res.token) {
          const { name, email, _id } = res;
          setCurrentUser({ name, email, _id });
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch(err => setResStatus(err));
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser({});
    setAllMovies([]);
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate('/signin');
  }

  function handleUpdateProfile(name, email) {
    if (!name || !email) return;
    return editProfile({ name, email })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setResStatus('ok');
      })
      .catch(err => setResStatus(err))
  }

  function handleSearchMovies(searchValue, checkboxValue) {
    if (!searchValue.length) {
      setResStatus('emptySearch');
      return;
    }
    if (allMovies.length) {
      setFilteredMovies(filterMovies(allMovies, searchValue, checkboxValue));
      localStorage.setItem('search', searchValue);
      localStorage.setItem('checkbox', checkboxValue);
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      return;
    } else {
      setIsLoading(true);
      return getMovies()
        .then(movies => {
          setAllMovies(movies);
          setFilteredMovies(filterMovies(movies, searchValue, checkboxValue));
          localStorage.setItem('search', searchValue);
          localStorage.setItem('checkbox', checkboxValue);
          localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
          return;
        })
        .catch(err => setResStatus(err))
        .finally(() => setIsLoading(false));
    }
  }

  function handleSaveMovie(movie) {
    saveMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(err => setResStatus(err))
  }

  //Обработчик удаления карточки
  function handleDeleteMovie(movie) {
    const movieToDelete = savedMovies.find(m => movie.id === m.movieId || movie.movieId === m.movieId);
    deleteMovie(movieToDelete._id)
      .then(removedMovie => {
        setSavedMovies(state =>
          state.filter(item => item._id !== removedMovie._id)
        );
      })
      .catch(err => setResStatus(err))
  }

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      setIsInit(true);
      return;
    }
    checkToken()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          updateSavedMovies();
        } else {
          setIsLoggedIn(false);
          setCurrentUser({});
          navigate('/signin');
        }
      })
      .catch(err => {
        setResStatus(err);
      })
      .finally(() => setIsInit(true));
  }, []);

  useEffect(() => {
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies))
  }, [filteredMovies, savedMovies])
  

  return isInit ? (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path='/' element={<Content />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  foundMovies={filteredMovies}
                  savedMovies={savedMovies}
                  handleSearchSubmit={handleSearchMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  isLoading={isLoading}
                  resStatus={resStatus}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  moviesToRender={filteredMovies}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  updateSavedMovies={updateSavedMovies}
                  isLoading={isLoading}
                  resStatus={resStatus}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  handleLogout={handleLogout}
                  handleFormSubmit={handleUpdateProfile}
                  isLoading={isLoading}
                  resStatus={resStatus}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <Register handleSubmit={handleRegister} resStatus={resStatus} />
            }
          />
          <Route
            path='/signin'
            element={<Login handleSubmit={handleLogin} resStatus={resStatus} />}
          />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        {isFooterVisible && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  ) : null;
}

export default App;
