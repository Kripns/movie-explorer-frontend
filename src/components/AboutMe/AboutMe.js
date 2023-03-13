import { Link } from 'react-router-dom';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='content__title'>Студент</h2>
      <article className='about-me__card'>
        <div className='about-me__avatar' />
        <div className='about-me__text-container'>
          <h3 className='about-me__heading'>Пётр</h3>
          <p className='about-me__subheading'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__paragraph'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className='about-me__link' to='#'>
            Github
          </Link>
        </div>
      </article>
    </section>
  );
}

export default AboutMe;
