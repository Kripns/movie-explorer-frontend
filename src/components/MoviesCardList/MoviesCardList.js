import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

function MoviesCardList(props) {
  const { movies, savedMovies, savedMoviesToRender, handleSaveMovie, handleDeleteMovie} = props;
  const location = useLocation();
  const cards = location.pathname === '/movies' ? movies : savedMoviesToRender;

  useEffect(() => {
    movies.map(movie => {
      movie.isLiked = savedMovies.some(m => m.movieId === movie.id);
      return movie;
    }, [movies, savedMovies])
  });

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
