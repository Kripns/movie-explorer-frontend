import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

function SavedMovies(props) {
  const { moviesToRender, savedMovies, handleSearchSubmit, updateSavedMovies, handleDeleteMovie } = props;
  
  useEffect(() => {
    updateSavedMovies()
  }, [])

  return (
    <section className='movies movies_place_saved-movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {!savedMovies.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList  moviesToRender={moviesToRender} savedMovies={savedMovies} handleDeleteMovie={handleDeleteMovie} />
        </>
      )}
    </section>
  );
}

export default SavedMovies;
