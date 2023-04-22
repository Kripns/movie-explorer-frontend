import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { useState } from 'react';

// TODO не забыть прелоудер!!!!!!!!!
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const isFooterVisible =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile name='Виталий' email='pochta@yandex.ru' />} />
      </Routes>
      {isFooterVisible && <Footer />}
    </div>
  );
}

export default App;
