import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const { cards, handleSubmit } = props;

  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSubmit} />
      {!cards.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList cards={cards} />
          <button className='movies__button'>Ещё</button>
        </>
      )}
    </section>
  );
}

export default Movies;
