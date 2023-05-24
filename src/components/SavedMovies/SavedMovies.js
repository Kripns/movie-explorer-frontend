import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

function SavedMovies(props) {
  const {
    moviesToRender,
    savedMovies,
    filteredSavedMovies,
    handleSearchSubmit,
    updateSavedMovies,
    handleDeleteMovie,
    isLoading
  } = props;
  
  const [nothingFound, setNothingFound] = useState(false);

  function handleSubmit(value, checkboxValue) {
    handleSearchSubmit(value, checkboxValue);
    setNothingFound(!filteredSavedMovies.length);
    console.log('nothingFound1', nothingFound)
    console.log('filteredSavedMovies1', filteredSavedMovies)
  }

  useEffect(() => {
    updateSavedMovies();
    setNothingFound(false);
  }, [])

  // useEffect(() => {
  //   setNothingFound(!filteredSavedMovies.length)
  // }, [filteredSavedMovies.length])

  // console.log('nothingFound2', nothingFound)

  return (
    <section className='movies movies_place_saved-movies'>
      <SearchForm handleSubmit={handleSubmit} />
      {
      isLoading ? <Preloader />
      : nothingFound ? <p className='movies__text'>Ничего не найдено.</p>
      : <MoviesCardList
          movies={moviesToRender}
          savedMovies={savedMovies}
          filteredSavedMovies={filteredSavedMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      }
    </section>
  );
}

export default SavedMovies;
