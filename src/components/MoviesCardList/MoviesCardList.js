import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

function MoviesCardList(props) {
  const { movies, savedMovies, savedMoviesToRender, handleSaveMovie, handleDeleteMovie} = props;
  const location = useLocation();
  const cards = location.pathname === '/movies' ? movies : savedMoviesToRender;

  // useEffect(() => {
  //   movies.map(movie => {
  //     movie.isLiked = savedMovies.some(m => m.movieId === movie.id);
  //     // console.log(movie);
  //     return movie;
  //   // }, [cards, savedMovies])
  // }, [])
  // });

  return (
    <ul className='movies__card-list'>
      {cards.map((item) => {
        return (
          <li key={item.id || item.movieId}>
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
