import { useCallback, useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { debounce } from '../../utils/functions';
import { resErrors } from '../../utils/constants';
import './Movies.css';

function Movies(props) {
  const {
    handleSearchSubmit,
    foundMovies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    isLoading,
  } = props;

  const [nothingFound, setNothingFound] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);

  const handleResize = useCallback(
    debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 1000),
    []
  );

  const cardsToRender = useMemo(() => {
    const countToRender = screenWidth < 541 ? 5 : screenWidth < 866 ? 8 : 12;

    return foundMovies.slice(0, countToRender * page);
  }, [foundMovies, page, screenWidth]);

  const handleMoreClick = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setNothingFound(!foundMovies.length)
  }, [foundMovies])

  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {
      isLoading ? <Preloader />
      : nothingFound ? <p className='movies__error'>{resErrors.nothingFound}</p>
      : <>
          <MoviesCardList
            movies={cardsToRender}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
          <button
              className={`movies__button ${
                foundMovies.length === cardsToRender.length &&
                'movies__button_disabled'
              }`}
              onClick={handleMoreClick}
            >
              Ещё
          </button>
        </>
        
      }
    </section>
  );
}

export default Movies;
