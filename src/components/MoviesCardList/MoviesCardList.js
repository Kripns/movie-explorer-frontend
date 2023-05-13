import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { cards, handleButtonClick, cardButtonClassName} = props;
  return (
    <ul className='movies__card-list'>
      {cards.map((item, index) => {
        return (
          <li key={index}>
            <MoviesCard card={item} handleButtonClick={handleButtonClick} cardButtonClassName={cardButtonClassName} />
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
