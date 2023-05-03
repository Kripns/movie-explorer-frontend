import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__date'>© 2023</p>
        <ul className='footer__links'>
          <li>
            <Link className='footer__link' to='https://practicum.yandex.ru/' target='blank'>Яндекс.Практикум</Link>
          </li>
          <li>
            <Link className='footer__link' to='https://github.com/Kripns' target='blank'>Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;