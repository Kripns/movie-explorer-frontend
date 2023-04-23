import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <section className='login'>
      <AuthForm headingText='Рады видеть!'>
        <label className='auth-form__label'>
          E-mail <input className='auth-form__input' type='email'></input>
        </label>
        <span className='auth-form__error'></span>
        <label className='auth-form__label'>
          Пароль <input className='auth-form__input' type='password'></input>
        </label>
        <span className='auth-form__error'></span>
        <button
          className='auth-form__button auth-form__button_signin'
          type='submit'
        >
          Войти
        </button>
        <p className='auth-form__subheading'>
          Ещё не зарегистрированы?{' '}
          <Link className='auth-form__link' to={'/signup'}>
            Регистрация
          </Link>
        </p>
      </AuthForm>
    </section>
  );
}

export default Login;
