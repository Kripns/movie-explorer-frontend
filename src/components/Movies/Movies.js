import './Movies.css';
import { useCallback, useState, useEffect, useMemo } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { debounce, filterMovies } from '../../utils/functions';
import { resErrors } from '../../utils/constants';

function Movies(props) {
  const {
    allMovies,
    getAllMovies,
    // handleSearchSubmit,
    // foundMovies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    isLoading,
    resStatus
  } = props;
// debugger
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(JSON.parse(localStorage.getItem('checkbox')) || false);
  const [statusMessage, setStatusMessage] = useState(false);

  function handleSearchFormSubmit(inputValue, checkboxValue) {
    !allMovies.length && getAllMovies();
    setSearchValue(inputValue);
    setCheckboxValue(checkboxValue);
  };
  
  function getCheckboxValue(checkboxValue) {
    return setCheckboxValue(checkboxValue);
  };

  useEffect(() => {
    if(localStorage.getItem('search')) setSearchValue(localStorage.getItem('search'));
    if(localStorage.getItem('checkbox')) setCheckboxValue(JSON.parse(localStorage.getItem('checkbox')))
    if(localStorage.getItem('filteredMovies')) setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
  }, []);

  // debugger
  useEffect(() => {
    if (!searchValue) return;
    if(!allMovies.length) {return}
    else {setFilteredMovies(filterMovies(allMovies, searchValue, checkboxValue));};
  }, [allMovies, searchValue, checkboxValue]);

  useEffect(() => {
    localStorage.setItem('allMovies', JSON.stringify(allMovies));
  }, [allMovies])
      
  useEffect(() => {
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  }, [filteredMovies, savedMovies])

  useEffect(() => {
    localStorage.setItem('checkbox', checkboxValue);
  }, [checkboxValue])

  useEffect(() => {
    localStorage.setItem('search', searchValue);
  }, [searchValue])


  useEffect(() => {
    allMovies.length && setFilteredMovies(filterMovies(allMovies, searchValue, checkboxValue));
  }, [checkboxValue]);

  const handleResize = useCallback(
    debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 1000),
    []
  );

  const cardsToRender = useMemo(() => {
    const countToRender = screenWidth < 541 ? 5 : screenWidth < 866 ? 8 : 12;

    return filteredMovies.slice(0, countToRender * page);
  }, [filteredMovies, page, screenWidth]);

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
    resStatus === 'emptySearch'
    ? setStatusMessage(resErrors.emptySearch)
    : resStatus === 'Ошибка: 500'
    ? setStatusMessage(resErrors.error500)
    : setStatusMessage('Что-то пошло не так.')
    if(!resStatus) { setStatusMessage(false) };
  }, [resStatus, searchValue]);

  useEffect(() => {
    !filteredMovies.length && searchValue
    ? setStatusMessage(resErrors.nothingFound)
    : setStatusMessage(false)
  }, [filteredMovies, searchValue])

  return (
    <section className='movies'>
      <SearchForm
        getCheckboxValue={getCheckboxValue}
        handleSubmit={handleSearchFormSubmit}
        searchValue={searchValue}
        checkboxValue={checkboxValue}
        isLoading={isLoading}
      />
      {
      isLoading ? <Preloader />
      : statusMessage ? <p className='movies__error'>{statusMessage}</p>
      : <>
          <MoviesCardList
            movies={cardsToRender}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
          <button
            className={`movies__button ${filteredMovies.length === cardsToRender.length && 'movies__button_disabled'}`}
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
