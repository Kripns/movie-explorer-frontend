import './MoviesCard.css';

function MoviesCard(props) {
  const { card, handleButtonClick, cardButtonClassName } = props;
  // const likeButtonClassName = isLiked
  //   ? 'movies__card-button_liked'
  //   : 'movies__card-button_like';


  return (
    <article className='movies__card'>
      <div className='movies__card-info'>
        <h2 className='movies__card-heading'>{card.nameRU}</h2>
        <p className='movies__card-duration'>{card.duration}</p>
          <button
            className={`movies__card-button ${cardButtonClassName}`}
            // onClick={handleClick}
            type='button'
          />
        {/* {location.pathname === '/saved-movies' && (
          <button
            className='movies__card-button movies__card-button_delete'
            onClick={handleClick}
            type='button'
          />
        )} */}
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
