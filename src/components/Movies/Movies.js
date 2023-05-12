import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const { cards } = props;

  return(
    <section className='movies'>
      <SearchForm />
      <MoviesCardList 
        cards={cards}
      />
      <button className='movies__button'>Ещё</button>
    </section>
  )
}

export default Movies;