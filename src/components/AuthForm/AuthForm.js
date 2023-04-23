import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm(props) {
  const { headingText } = props;

  return (
    <form className='auth-form'>
      <Link className='header__logo' to={'/'} />
      <h2 className='auth-form__heading'>{headingText}</h2>
      {props.children}
    </form>
  );
}

export default AuthForm;
