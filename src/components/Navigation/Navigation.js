import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Navigation.css';

function Navigation(props) {
  const { isLoggedIn } = props;
  const location = useLocation();
  const linkClassName =
    location.pathname === '/' ? `navigation__link_place_landing` : '';

  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );

  const [isMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleMenuOpen() {
    isMenuOpen ? setIsBurgerMenuOpen(false) : setIsBurgerMenuOpen(true);
  }

  //Подписываемся на изменение размера экрана
  useEffect(() => {
    window
      .matchMedia('(max-width: 768px)')
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  useEffect(() => setIsBurgerMenuOpen(false), [location.pathname]);

  return (
    <nav className='navigation'>
      {!isLoggedIn && (
        <div className='navigation__links navigation__links_type_auth'>
          <Link className={`navigation__link ${linkClassName}`} to='/signup'>
            Регистрация
          </Link>
          <Link
            className='navigation__link navigation__link_type_login'
            to='/signin'
          >
            Войти
          </Link>
        </div>
      )}

      {isLoggedIn && !matches && (
        <>
          <div className='navigation__links navigation__links_type_films'>
            <NavLink
              className={({ isActive }) =>
                `navigation__link navigation__link_type_movies ${linkClassName} ${
                  isActive ? 'navigation__link_active' : ''
                }`
              }
              to='/movies'
            >
              Фильмы
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `navigation__link navigation__link_type_saved-movies  ${linkClassName} ${
                  isActive ? 'navigation__link_active' : ''
                }`
              }
              to='/saved-movies'
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className='navigation__links navigation__links_type_account'>
            <NavLink
              className={({ isActive }) =>
                `navigation__link navigation__link_type_profile  ${linkClassName} ${
                  isActive ? 'navigation__link_active' : ''
                }`
              }
              to='/profile'
            >
              Аккаунт
              <div className='profile-icon' />
            </NavLink>
          </div>
        </>
      )}

      {isLoggedIn && matches && (
        <BurgerMenu handleClick={handleMenuOpen} isOpen={isMenuOpen} />
      )}
    </nav>
  );
}

export default Navigation;
