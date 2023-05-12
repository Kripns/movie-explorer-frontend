import { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const { card } = props;
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();
  const buttonClassName = location.pathname === '/saved-movies'
    ? 'movies__card-button_delete'
    : isLiked ? 'movies__card-button_liked' : 'movies__card-button_like';

//Имитация работы лайков
  function handleClick() {
    return location.pathname === '/movies' ? setIsLiked(!isLiked) : null;
  }

  return (
    <article className='movies__card' >
      <div className='movies__card-info'>
        <h2 className='movies__card-heading'>{card.nameRU}</h2>
        <p className='movies__card-duration'>{card.duration}</p>
        <button
          className={`movies__card-button ${buttonClassName}`}
          onClick={handleClick}
          type='button'
        />
      </div>
      <img
        className='movies__card-image'
        src={`https://api.nomoreparties.co/${card.image.url}`}
        alt={card.nameRU}
      />
    </article>
  );
}

export default MoviesCard;
