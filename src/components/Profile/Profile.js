import './Profile.css';

function Profile(props) {
  const { name, email } = props;
  return (
    <section className='profile'>
      <h2 className='profile__heading'>Привет, {name}!</h2>
      <form className='profile__form'>
        <label className='profile__form-label' htmlFor='profile-name'>
        Имя
          <input
            className='profile__form-input'
            id='profile-name'
            type='text'
            value={name}
            placeholder='Имя'
          />
        </label>
        <label className='profile__form-label' htmlFor='profile-email'>
        E-mail
        <input
          className='profile__form-input'
          id='profile-email'
          type='email'
          value={email}
          placeholder='E-mail'
        />
        </label>
        <div className='profile__form-buttons'>
          <button className='profile__form-button profile__form-button_type_edit' type='submit'>Редактировать</button>
          <button className='profile__form-button profile__form-button_type_exit'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
