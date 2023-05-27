import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { resErrors } from '../../utils/constants';

function Profile(props) {
  const { handleLogout, handleFormSubmit, isLoading, resStatus } = props;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, isValid } = useFormAndValidation();
  
  function handleClick() {
    handleLogout()
  }; 

  function handleSubmit(e) {
    e.preventDefault();
    handleFormSubmit(values.name, values.email)
  } 

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email })
  }, []);

  useEffect(() => {
    setIsSubmitDisabled((values.name === currentUser.name && values.email === currentUser.email) || isLoading || !isValid)
  }, [currentUser, values, isLoading, isValid]);

  useEffect(() => {
    setIsInputsDisabled(isLoading);
  }, [isLoading]);

  useEffect(() => {
    resStatus === 'ok' 
    ? setStatusMessage(resErrors.profile200)
    : resStatus === `Ошибка: 409`
    ? setStatusMessage(resErrors.error409)
    : setStatusMessage(resErrors.profileError);
    if(!resStatus) { setStatusMessage(false) };
  }, [resStatus]);

  return (
    <section className='profile'>
      <h2 className='profile__heading'>Привет, {currentUser.name}!</h2>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__form-label' htmlFor='profile-name'>
        Имя
          <input
            className='profile__form-input'
            id='profile-name'
            type='text'
            name='name'
            value={values.name || ''}
            onChange={handleChange}
            disabled={isInputsDisabled}
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <span className='profile-form__error profile-name-input-error'></span>
        <label className='profile__form-label' htmlFor='profile-email'>
        E-mail
        <input
          className='profile__form-input'
          id='profile-email'
          type='email'
          name='email'
          value={values.email || ''}
          onChange={handleChange}
          disabled={isInputsDisabled}
          required
        />
        </label>
        <span className='profile-form__error profile-email-input-error'>{}</span>
        <p
          className={`profile__status-message ${statusMessage && 'profile__status-message_visible'}`}>
            {statusMessage}
        </p>
        <div className='profile__form-buttons'>
          <button
            className={`profile__form-button profile__form-button_type_edit ${isSubmitDisabled && 'profile__form-button_disabled'}`}
            type='submit' >
              Редактировать
          </button>
          <button
            className={`profile__form-button profile__form-button_type_exit ${isInputsDisabled && 'profile__form-button_disabled'}`}
            onClick={handleClick}
            disabled={isInputsDisabled}
            >
              Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
