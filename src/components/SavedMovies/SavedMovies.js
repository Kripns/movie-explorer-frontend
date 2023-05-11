import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const { cards } = props;

  return(
    <section className='movies movies_place_saved-movies'>
      <SearchForm />
      <MoviesCardList 
        cards={cards}
      />
    </section>
  )
};

export default SavedMovies;
