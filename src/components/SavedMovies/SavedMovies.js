import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/functions';
import { resErrors } from '../../utils/constants';


function SavedMovies(props) {
  const {
    moviesToRender,
    savedMovies,
    updateSavedMovies,
    handleDeleteMovie,
    isLoading
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);

  function handleSearchMovies(value, checkboxValue) {
    setSearchValue(value);
    setCheckboxValue(checkboxValue);
  }

  useEffect(() => {
    updateSavedMovies();
    setSavedMoviesToRender(savedMovies)
    setFilteredSavedMovies([]);
    setNothingFound(false);
  }, [])

  useEffect(() => {
    setFilteredSavedMovies(filterMovies(savedMovies, searchValue, checkboxValue))
  }, [savedMovies, searchValue, checkboxValue])

  
  useEffect(() => {
    setSavedMoviesToRender((filteredSavedMovies.length && filteredSavedMovies) || savedMovies);
  }, [filteredSavedMovies, savedMovies]);
  

  return (
    <section className='movies movies_place_saved-movies'>
      <SearchForm handleSubmit={handleSearchMovies} />
      {
      isLoading ? <Preloader />
      : nothingFound ? <p className='movies__error'>{resErrors.nothingFound}</p>
      : <MoviesCardList
          movies={moviesToRender}
          savedMovies={savedMovies}
          filteredSavedMovies={filteredSavedMovies}
          savedMoviesToRender={savedMoviesToRender}
          handleDeleteMovie={handleDeleteMovie}
        />
      }
    </section>
  );
}

export default SavedMovies;
