import './Movies.css';

function Movies() {
  return(
    <section className='movies'>
      <form className='search-form'>
        <fieldset className='search-form__input-wrapper'>
          <input className='search-form__input' type='search-form' placeholder='Фильм' />
          <button className='search-form__submit-button' />
        </fieldset>
        <fieldset className='checkbox-wrapper'>
          <div>
            <div></div>
            <input type='checkbox' />
          </div>
          <label className='checkbox__lable'>Короткометражки</label>
        </fieldset>
      </form>
    </section>
  )
}

export default Movies;