import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu(props) {
  const { handleClick, isOpen } = props;

  return (
    <>
      {!isOpen && (
        <button className='burger-menu__button burger-menu__button_open' onClick={handleClick} />
      )}
      {isOpen && (
        <div className='burger-menu__overlay'>
          <nav className='burger-menu'>
            <button className='burger-menu__button burger-menu__button_close' onClick={handleClick} />
            <ul className='burger-menu__links'>
              <li>
                <NavLink
                  className={({isActive}) =>
                    `burger-menu__link ${
                      isActive && 'burger-menu__link_active'
                    }`
                  }
                  to='/'
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({isActive}) =>
                    `burger-menu__link ${
                      isActive && 'burger-menu__link_active'
                    }`
                  }
                  to='/movies'
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({isActive}) =>
                    `burger-menu__link ${
                      isActive && 'burger-menu__link_active'
                    }`
                  }
                  to='/saved-movies'
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className='navigation__links navigation__links_type_account'>
            <NavLink
              className={({ isActive }) =>
                `navigation__link navigation__link_type_profile ${
                  isActive ? 'navigation__link_active' : ''
                }`
              }
              to='/profile'
            >
              Аккаунт
              <div className='profile-icon' />
            </NavLink>
          </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default BurgerMenu;
