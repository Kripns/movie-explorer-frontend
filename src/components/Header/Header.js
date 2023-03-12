import './Header.css';
import HeaderLogo from './HeaderLogo/HeaderLogo.js';
import HeaderMenu from './HeaderMenu/HeaderMenu';

function Header() {
  return (
    <header className="header">
      <HeaderLogo />
      <HeaderMenu />
    </header>
  )
}

export default Header;