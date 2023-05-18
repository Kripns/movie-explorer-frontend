import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

function MoviesCardList(props) {
  const { moviesToRender, savedMovies, handleSaveMovie, handleDeleteMovie} = props;
  const location = useLocation();
  const cards = location.pathname === '/movies' ? moviesToRender : savedMovies;

  useEffect(() => {
    moviesToRender.map(movie => {
      movie.isLiked = savedMovies.some(m => m.movieId === movie.id);
      return movie;
    }, [moviesToRender, savedMovies])
  })
  
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
