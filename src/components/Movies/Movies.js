import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const { handleSearchSubmit, moviesToRender, savedMovies, handleSaveMovie, handleDeleteMovie } = props;

  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {!moviesToRender.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList
            moviesToRender={moviesToRender}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
          <button className='movies__button'>Ещё</button>
        </>
      )}
    </section>
  );
}

export default Movies;
