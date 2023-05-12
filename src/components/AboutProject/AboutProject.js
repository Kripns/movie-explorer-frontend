import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='content__title'>О проекте</h2>
      <ul className='table'>
        <li>
          <article className='table__cell'>
            <h3 className='table__heading'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='table__text'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </article>
        </li>
        <li>
          <article className='table__cell'>
            <h3 className='table__heading'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='table__text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </li>
      </ul>
      <ul className='two-columns'>
        <li>
          <div className='two-columns__column two-columns__column_left'>
            <h4 className='two-columns__heading two-columns__heading_left'>1 неделя</h4>
            <p className='two-columns__text'>Back-end</p>
          </div>
        </li>
        <li>
          <div className='two-columns__column two-columns__column_right'>
            <h4 className='two-columns__heading two-columns__heading_right'>4 недели</h4>
            <p className='two-columns__text'>Front-end</p>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
