import './MoviesCard.css';

function MoviesCard(props) {
  const { card, key, buttonClassName } = props;

  return (
    <article className='movies__card' key={key}>
      <div className='movies__card-info'>
        <h2 className='movies__card-heading'>{card.name}</h2>
        <p className='movies__card-duration'>{card.duration}</p>
        <button
          className={`movies__card-button ${buttonClassName}`}
          type='button'
          // onClick={handleSaveClick}
        />
        {/* <div className='card__likes-wrapper'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          />
          <p className='card__like-counter'>{card.likes.length}</p>
        </div> */}
      </div>
      <img
        className='movies__card-image'
        src={card.link}
        alt={card.name}
        // onClick={handleClick}
      />
    </article>
  );
}

export default MoviesCard;
