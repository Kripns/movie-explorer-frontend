import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
  return(
    <section className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button className='movies__button movies__button_margin-bottom'>Ещё</button>
    </section>
  )
}

export default Movies;