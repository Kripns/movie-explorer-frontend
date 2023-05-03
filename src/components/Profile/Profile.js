import './Profile.css';

function Profile(props) {
  const { user } = props;
  
  return (
    <section className='profile'>
      <h2 className='profile__heading'>Привет, {user.name}!</h2>
      <form className='profile__form'>
        <label className='profile__form-label' htmlFor='profile-name'>
        Имя
          <input
            className='profile__form-input'
            id='profile-name'
            type='text'
            name='profile-name'
          />
        </label>
        {/* <span className='profile-form__error profile-name-input-error'></span> */}
        <label className='profile__form-label' htmlFor='profile-email'>
        E-mail
        <input
          className='profile__form-input'
          id='profile-email'
          type='email'
          name='profile-email'
        />
        </label>
        {/* <span className='profile-form__error profile-email-input-error'></span> */}
        <div className='profile__form-buttons'>
          <button className='profile__form-button profile__form-button_type_edit' type='submit'>Редактировать</button>
          <button className='profile__form-button profile__form-button_type_exit'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
