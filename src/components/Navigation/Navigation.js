import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
  const { isLoggedIn } = props;
  const location = useLocation();
  const linkClassName = location.pathname === '/' 
    ? `navigation__link_place_landing`
    : '';

  return (
    <nav className='navigation__menu'>
      {!isLoggedIn ? (
        <div className='navigation__links navigation__links_type_auth'>
          <Link className={`navigation__link ${linkClassName}`} to='/signup'>
            Регистрация
          </Link>
          <Link className='navigation__link navigation__link_type_login' to='/signin'>
            Войти
          </Link>
        </div>
      ) : (
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
    </nav>
  );
}

export default Navigation;
