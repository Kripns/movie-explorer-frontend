import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { useEffect } from 'react';

function Register(props) {
  const { handleSubmit } = props;
  const { values, errors, isValid, handleChange, resetForm } =
  useFormAndValidation();

  function handleRegister(e) {
    e.preventDefault();
    return handleSubmit(values.name, values.email, values.password)
  };

  useEffect(() => {
    resetForm()
  }, []);

  return (
    <section className='register'>
      <AuthForm headingText='Добро пожаловать!' handleSubmit={handleRegister}>
        <label className='auth-form__label'>
          Имя 
          <input
            className='auth-form__input'
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            required 
          />
        </label>
        <span className='auth-form__error name-input-error'></span>
        <label className='auth-form__label'>
          E-mail 
          <input
            className='auth-form__input'
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}  
            required 
          />
        </label>
        <span className='auth-form__error email-input-error'></span>
        <label className='auth-form__label'>
          Пароль
          <input
            className='auth-form__input'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}  
            required
          />
        </label>
        <span className='auth-form__error password-input-error'></span>
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
