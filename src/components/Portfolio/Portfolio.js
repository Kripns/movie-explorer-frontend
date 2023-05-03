import { Link } from 'react-router-dom';
import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <div className='portfolio__link-container'>
        <Link 
          className='portfolio__link-text' 
          to='https://kripns.github.io/how-to-learn/' 
          target='blank'>
            Статичный сайт
        </Link>
        <Link 
          className='portfolio__link-arrow'
          to='https://kripns.github.io/how-to-learn/'
          target='blank'
        />
      </div>
      <div className='portfolio__link-container'>
        <Link 
          className='portfolio__link-text' 
          to='https://kripns.github.io/russian-travel' 
          target='blank'>
            Адаптивный сайт
        </Link>
        <Link 
          className='portfolio__link-arrow'
          to='https://kripns.github.io/russian-travel'
          target='blank'
        />
      </div>
      <div className='portfolio__link-container'>
        <Link 
          className='portfolio__link-text' 
          to='https://kripns.github.io/react-mesto-auth' 
          target='blank'>
            Одностраничное приложение
        </Link>
        <Link 
          className='portfolio__link-arrow'
          to='https://kripns.github.io/react-mesto-auth'
          target='blank'
        />
      </div>
    </section>
    )
}

export default Portfolio;