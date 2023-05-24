import { useCallback, useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const { handleSearchSubmit, foundMovies, savedMovies, handleSaveMovie, handleDeleteMovie } = props;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);

  const handleResize = useCallback(debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 1000), []);

  const cardsToRender = useMemo(() => {
    const countToRender = screenWidth < 541 ? 5 : screenWidth < 866 ? 8 : 12;

    return foundMovies.slice(0, countToRender * page);
  }, [foundMovies, page, screenWidth]);

  const handleMoreClick = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }


  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {!foundMovies.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList
            movies={cardsToRender}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
          <button 
            className={`movies__button ${foundMovies.length === cardsToRender.length && 'movies__button_disabled'}`} 
            onClick={handleMoreClick}>
              Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default Movies;
