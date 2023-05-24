import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

function MoviesCardList(props) {
  const { movies, savedMovies, filteredSavedMovies, handleSaveMovie, handleDeleteMovie} = props;
  const location = useLocation();
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
  // const savedMoviesToRender = filteredSavedMovies && filteredSavedMovies.length ? filteredSavedMovies : savedMovies;
  const cards = location.pathname === '/movies' ? movies : savedMoviesToRender;

  useEffect(() => {
    movies.map(movie => {
      movie.isLiked = savedMovies.some(m => m.movieId === movie.id);
      return movie;
    }, [movies, savedMovies])
  });

  // console.log('filteredSavedMovies2', filteredSavedMovies)

  useEffect(() => {
    setSavedMoviesToRender((filteredSavedMovies.length && filteredSavedMovies) || savedMovies);
  }, [filteredSavedMovies.length, filteredSavedMovies, savedMovies]);

  // console.log('savedMoviesToRender', savedMoviesToRender)
  
  return (
    <ul className='movies__card-list'>
      {cards.map((item, index) => {
        return (
          <li key={index}>
            <MoviesCard
              card={item}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
