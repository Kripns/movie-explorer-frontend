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

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
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

  function getAllMovies() {
    setIsLoading(true);
    return getMovies()
      .then(movies => {
        setAllMovies(movies);
        setResStatus(false);
      })
      .catch(err => setResStatus(err))
      .finally(() => setIsLoading(false));
  }
  
  function updateSavedMovies() {
    setIsLoading(true);
    return getSavedMovies()
      .then(movies => {
        setSavedMovies(movies)
        setResStatus(false);
      })
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
          setResStatus(false);
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
          setResStatus(false);
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
    setResStatus(false);
    navigate('/');
  }

  function handleEditProfile(name, email) {
    if (!name || !email) return;
    return editProfile({ name, email })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setResStatus('ok');
      })
      .catch(err => setResStatus(err))
  }

  function handleSaveMovie(movie) {
    saveMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        setResStatus(false);
      })
      .catch(err => setResStatus(err))
  }

  function handleDeleteMovie(movie) {
    const movieToDelete = savedMovies.find(m => movie.id === m.movieId || movie.movieId === m.movieId);
    deleteMovie(movieToDelete._id)
      .then(removedMovie => {
        setSavedMovies(state =>
          state.filter(item => item._id !== removedMovie._id)
        );
        setResStatus(false);
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
                  allMovies={allMovies}
                  getAllMovies={getAllMovies}
                  savedMovies={savedMovies}
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
                  handleFormSubmit={handleEditProfile}
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
