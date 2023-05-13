import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const { cards, handleSearchSubmit, handleButtonClick, cardButtonClassName } = props;

  return (
    <section className='movies'>
      <SearchForm handleSubmit={handleSearchSubmit} />
      {!cards.length ? (
        <p className='movies__text'>Фильмы не надены.</p>
      ) : (
        <>
          <MoviesCardList cards={cards} handleButtonClick={handleButtonClick} cardButtonClassName={cardButtonClassName} />
          <button className='movies__button'>Ещё</button>
        </>
      )}
    </section>
  );
}

export default Movies;
