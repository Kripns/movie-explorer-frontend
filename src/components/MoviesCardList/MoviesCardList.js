import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../images/card-image.jpg';
//TODO прописать стили для карточек и списка( сделать ул)

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
  }
];

function MoviesCardList() {
  
  return (
    <ul className='movies__card-list'>
      {cards.map((item, index) => {
        return (
          <li>
            <MoviesCard
              key={index}
              card={item}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
