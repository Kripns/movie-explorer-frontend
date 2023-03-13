import { Link } from 'react-router-dom';
import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <div className='portfolio__link-container'>
        <Link className='portfolio__link-text' to='#'>Статичный сайт</Link>
        <Link className='portfolio__link-arrow' to='#' />
      </div>
      <div className='portfolio__link-container'>
        <Link className='portfolio__link-text' to='#'>Адаптивный сайт</Link>
        <Link className='portfolio__link-arrow' to='#' />
      </div>
      <div className='portfolio__link-container'>
        <Link className='portfolio__link-text' to='#'>Одностраничное приложение</Link>
        <Link className='portfolio__link-arrow' to='#' />
      </div>
    </section>
    )
}

export default Portfolio;