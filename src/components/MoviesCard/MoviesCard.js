import './MoviesCard.css';
import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils/constants';
import { transformTime } from '../../utils/functions';


function MoviesCard(props) {
  const { card, savedMovies, handleSaveMovie, handleDeleteMovie } = props;
  const location = useLocation();

  const isLiked = useMemo(() => {
    console.log(`render ${card.nameRU}`)
    return savedMovies.some(m => m.movieId === card.id);
  }, [card, savedMovies])

  const likeButtonClassName = isLiked
    ? 'movies__card-button_liked'
    : 'movies__card-button_like';

  function handleLike() {
    !isLiked ? handleSaveMovie(card) : handleDeleteMovie(card);
  }

  function handleDelete() {
    return handleDeleteMovie(card);
  }

  return (
    <article className='movies__card'>
      <div className='movies__card-info'>
        <h2 className='movies__card-heading'>{card.nameRU}</h2>
        <p className='movies__card-duration'>{transformTime(card.duration)}</p>
        {location.pathname === '/movies' && (
          <button
            className={`movies__card-button ${likeButtonClassName}`}
            onClick={handleLike}
            type='button'
          />
        )}
        {location.pathname === '/saved-movies' && (
          <button
            className='movies__card-button movies__card-button_delete'
            onClick={handleDelete}
            type='button'
          />
        )}
      </div>
      <Link to={card.trailerLink} target='_blank'>
        <img
          className='movies__card-image'
          src={card.image.url ? `${apiUrl}${card.image.url}` : card.image}
          alt={card.nameRU}
        />
      </Link>
    </article>
  );
}

export default MoviesCard;
