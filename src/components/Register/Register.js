import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <section className='register'>
      <AuthForm headingText='Добро пожаловать!'>
        <label className='auth-form__label'>
          Имя <input className='auth-form__input' type='text'></input>
        </label>
        <span className='auth-form__error'></span>
        <label className='auth-form__label'>
          E-mail <input className='auth-form__input' type='email'></input>
        </label>
        <span className='auth-form__error'></span>
        <label className='auth-form__label'>
          Пароль <input className='auth-form__input' type='password'></input>
        </label>
        <span className='auth-form__error'></span>
        <button
          className='auth-form__button auth-form__button_signup'
          type='submit'
        >
          Зарегистрироваться
        </button>
        <p className='auth-form__subheading'>
          Уже зарегистрированы?{' '}
          <Link className='auth-form__link' to={'/signin'}>
            Войти
          </Link>
        </p>
      </AuthForm>
    </section>
  );
}

export default Register;
