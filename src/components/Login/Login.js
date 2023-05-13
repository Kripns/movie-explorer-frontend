import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Login(props) {
  const { handleSubmit } = props;
  const { values, errors, isValid, handleChange, resetForm } =
  useFormAndValidation();

  function handleLogin(e) {
    e.preventDefault();
    return handleSubmit(values.email, values.password)
  }

  useEffect(() => {
    resetForm()
  }, []);

  return (
    <section className='login'>
      <AuthForm headingText='Рады видеть!' handleSubmit={handleLogin}>
        <label className='auth-form__label'>
          E-mail 
          <input 
            className='auth-form__input'
            type='email'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <span className='auth-form__error login-name-input-error'></span>
        <label className='auth-form__label'>
          Пароль 
          <input
            className='auth-form__input'
            type='password'
            name='password'
            value={values.password || ''}
            onChange={handleChange}
            required
          />
        </label>
        <span className='auth-form__error login-password-input-error'></span>
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
