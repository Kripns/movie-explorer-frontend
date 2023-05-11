import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckBoxDisabled, setIsCheckBoxDisabled] = useState(true);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <fieldset className='checkbox'>
      <label
        className={`checkbox__lable ${
          isCheckBoxDisabled && 'checkbox__lable_inactive'
        }`}
        htmlFor='short-movies'
      >
        <input
          className='checkbox__input'
          type='checkbox'
          id='short-movies'
          checked={isChecked}
          onChange={handleCheck}
          disabled={isCheckBoxDisabled}
        />
        <div
          className={`checkbox__container ${
            isCheckBoxDisabled && 'checkbox__container_inactive'
          } ${isChecked && `checkbox__container_checked`}`}
        >
          <div className='checkbox__circle' />
        </div>
        <span>Короткометражки</span>
      </label>
    </fieldset>
  );
}

export default FilterCheckbox;
