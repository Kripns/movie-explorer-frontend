import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
  return(
    <section className='movies'>
      <SearchForm />
      <MoviesCardList 
        buttonClassName='movies__card-button_like'
      />
      <button className='movies__button'>Ещё</button>
    </section>
  )
}

export default Movies;