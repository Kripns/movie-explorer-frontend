import './Movies.css';
import { useCallback, useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { debounce } from '../../utils/functions';

function Movies(props) {
  const {
    handleSearchSubmit,
    foundMovies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    isLoading,
    // resStatus
  } = props;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(null);
  // const [statusMessage, setStatusMessage] = useState(false);

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

  // useEffect(() => {
  //   foundMovies.map(movie => {
  //     movie.isLiked = savedMovies.some(m => m.movieId === movie.id);
  //     return movie;
  //   // }, [cards, savedMovies])
  // }, [])
  // });

  useEffect(() => {
    setSearchValue(localStorage.getItem('search', searchValue));
  }, [searchValue]);

  useEffect(() => {
    setCheckboxValue(JSON.parse(localStorage.getItem('checkbox', checkboxValue)));
  }, [checkboxValue]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   resStatus === 'emptySearch'
  //   ? setStatusMessage(resErrors.emptySearch)
  //   : resStatus === 'nothingFound'
  //   ? setStatusMessage(resErrors.nothingFound)
  //   : setStatusMessage(resErrors.error500)
  //   if(!resStatus) { setStatusMessage(false) };
  // }, [resStatus, searchValue]);


  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSearchSubmit} searchValue={searchValue} checkboxValue={checkboxValue} />
      {
      isLoading ? <Preloader />
      // : resStatus ? <p className='movies__error'>{statusMessage}</p>
      : <>
          <MoviesCardList
            movies={cardsToRender}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
          <button
            className={`movies__button ${foundMovies.length === cardsToRender.length && 'movies__button_disabled'}`}
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
