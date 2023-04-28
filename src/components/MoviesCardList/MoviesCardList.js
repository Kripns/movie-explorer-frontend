import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../images/card-image.jpg';

const cards = [
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
  {
    name: '33 слова о дизайне',
    link: cardImage,
    duration: '1ч 47м',
  },
];

function MoviesCardList(props) {
  const { buttonClassName } = props;
  return (
    <ul className='movies__card-list'>
      {!cards.length ? (
        <p>Фильмы не надены.</p>
      ) : (
        cards.map((item, index) => {
          return (
            <li key={index}>
              <MoviesCard
                card={item}
                buttonClassName={buttonClassName}
              />
            </li>
          );
        })
      )}
    </ul>
  );
}

export default MoviesCardList;
