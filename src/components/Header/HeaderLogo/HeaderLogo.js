import { Link } from 'react-router-dom';
import './HeaderLogo.css'

function HeaderLogo() {
  return (
    <Link className='header__logo' to={'/'} />
  );
}

export default HeaderLogo;