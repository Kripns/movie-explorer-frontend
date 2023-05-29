import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { resErrors } from '../../utils/constants';

function Login(props) {
  const { handleSubmit, resStatus } = props;
  const [statusMessage, setStatusMessage] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } =
  useFormAndValidation();

  function handleLogin(e) {
    e.preventDefault();
    return handleSubmit(values.email, values.password)
  }

  useEffect(() => {
    resetForm()
  }, []);

  useEffect(() => {
    resStatus === `Ошибка: 400`
    ? setStatusMessage(resErrors.badLogin)
    : resStatus === `Ошибка: 401`
    ? setStatusMessage(resErrors.badToken)
    : setStatusMessage(resErrors.error500)
    if(!resStatus) { setStatusMessage(false) };
  }, [resStatus]);

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
        <span className={`auth-form__error email-input-error ${!isValid && 'auth-form__error_visible'}`}>{errors.email}</span>
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
        <span className={`auth-form__error password-input-error ${!isValid && 'auth-form__error_visible'}`}>{errors.password}</span>
        <p className={`auth-form__status-message ${statusMessage && 'auth-form__status-message_visible'}`}>{statusMessage}</p>
        <button
          className={`auth-form__button auth-form__button_signin ${!isValid && 'auth-form__button_disabled'}`}
          type='submit'
          disabled={!isValid}
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
