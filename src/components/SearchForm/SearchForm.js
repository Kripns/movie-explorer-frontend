import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked(!isChecked);
  }
  
  return (
    <form className='search-form'>
        <fieldset className='search-form__input-wrapper'>
          <input className='search-form__input' type='search-form' placeholder='Фильм' />
          <button className='search-form__submit-button' />
        </fieldset>
        <fieldset className='checkbox' onClick={handleCheck}>
          <div className={`checkbox__container ${isChecked && `checkbox__container_checked`}`}>
            <div className='checkbox__circle' />
          </div>
            <input className='checkbox__input' type='checkbox' id='short-movies' checked={isChecked} />
          <label className='checkbox__lable' htmlFor='short-movies' >Короткометражки</label>
        </fieldset>
      </form>
  )
}

export default SearchForm;