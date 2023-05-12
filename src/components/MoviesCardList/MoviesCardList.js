import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { cards, buttonClassName } = props;
  return (
    <ul className='movies__card-list'>
      {cards.map((item, index) => {
        return (
          <li key={index}>
            <MoviesCard card={item} buttonClassName={buttonClassName} />
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
