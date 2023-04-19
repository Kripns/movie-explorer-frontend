import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/movies'element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
