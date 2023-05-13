import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

function SavedMovies(props) {
  const { cards, handleSearchSubmit, updateSavedMovies } = props;

  useEffect(() => {
    updateSavedMovies()
  }, [])

  return (
    <section className='movies movies_place_saved-movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {!cards.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList cards={cards} />
        </>
      )}
    </section>
  );
}

export default SavedMovies;
