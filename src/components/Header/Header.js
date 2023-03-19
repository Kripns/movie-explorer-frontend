import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const { isLoggedIn } = props;
  const location = useLocation();
  const headerClassName = location.pathname === '/' ? 'header header_place_landing' : 'header';

  return (
    <header className={headerClassName}>
      <Link className='header__logo' to={'/'} />
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
