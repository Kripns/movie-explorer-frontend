import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './HeaderMenu.css'

function HeaderMenu() {
  // const [matches, setMatches] = React.useState(
  //   window.matchMedia('(max-width: 768px)').matches
  // );

  // //Подписываемся на изменение размера экрана
  // React.useEffect(() => {
  //   window
  //     .matchMedia('(max-width: 768px)')
  //     .addEventListener('change', e => setMatches(e.matches));
  // }, []);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
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
          }
        />
      </Routes>
    </>
  );
}

export default HeaderMenu;
