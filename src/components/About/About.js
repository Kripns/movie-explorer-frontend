import './About.css';

function About() {
  return (
    <section className='about'>
      <h2 className='content__title'>О проекте</h2>
      <ul className='table'>
        <li className='table__cell'>
          <h3 className='table__heading'>Дипломный проект включал 5 этапов</h3>
          <p className='table__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='table__cell'>
          <h3 className='table__heading'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='table__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div>
        <h4>1 неделя</h4>
        <p>Back-end</p>
      </div>
      <div>
        <h4>4 недели</h4>
        <p>Front-end</p>
      </div>
    </section>
  );
}

export default About;
