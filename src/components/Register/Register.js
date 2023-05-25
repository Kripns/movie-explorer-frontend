import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { resErrors } from '../../utils/constants';

function Register(props) {
  const { handleSubmit, resStatus } = props;
  const [statusMessage, setStatusMessage] = useState(false);

  const { values, errors, isValid, handleChange, resetForm } =
  useFormAndValidation();

  function handleRegister(e) {
    e.preventDefault();
    return handleSubmit(values.name, values.email, values.password);
  };

  useEffect(() => {
    resetForm()
  }, []);

  useEffect(() => {
    resStatus === `Ошибка: 409`
    ? setStatusMessage(resErrors.error409)
    : setStatusMessage(resErrors.registerError);
    if(!resStatus) { setStatusMessage(false) };
  }, [resStatus]);

  return (
    <section className='register'>
      <AuthForm headingText='Добро пожаловать!' handleSubmit={handleRegister}>
        <label className='auth-form__label'>
          Имя 
          <input
            className='auth-form__input'
            type='text'
            name='name'
            value={values.name || ''}
            onChange={handleChange}
            required 
          />
        </label>
        <span className={`auth-form__error name-input-error ${!isValid && 'auth-form__error_visible'}`}>{errors.name}</span>
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
          className={`auth-form__button auth-form__button_signup ${!isValid && 'auth-form__button_disabled'}`}
          type='submit'
          disabled={!isValid}
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
