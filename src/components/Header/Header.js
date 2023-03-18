import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <header className='header header_place_landing'>
              <Link className='header__logo' to={'/'} />
              <nav className='header__menu'>
                <div className='header__links header__links_type_auth'>
                  <Link
                    className='header__link header__link_type_signin'
                    to='/signin'
                  >
                    Регистрация
                  </Link>
                  <Link
                    className='header__link header__link_type_login'
                    to='login'
                  >
                    Войти
                  </Link>
                </div>
              </nav>
            </header>
          }
        />
        <Route
          path='/movies'
          element={
            <header className='header'>
              <Link className='header__logo' to={'/'} />
              <nav className='header__menu'>
                <div className='header__links header__links_type_films'>
                  <Link
                    className='header__link header__link_type_movies'
                    to='/movies'
                  >
                    Фильмы
                  </Link>
                  <Link
                    className='header__link header__link_type_saved-movies'
                    to='/saved-movies'
                  >
                    Сохранённые фильмы
                  </Link>
                </div>
                <div className='header__links header__links_type_account'>
                  <Link
                    className='header__link header__link_type_profile'
                    to='/profile'
                  >
                    Аккаунт
                    <div className='profile-icon' />
                  </Link>
                </div>
              </nav>
            </header>
          }
        />
      </Routes>
    </>
  );
}

export default Header;
