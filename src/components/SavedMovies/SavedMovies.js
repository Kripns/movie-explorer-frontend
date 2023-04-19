import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies() {
  return(
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList 
        buttonClassName='movies__card-button_delete'
      />
    </section>
  )
};

export default SavedMovies;
