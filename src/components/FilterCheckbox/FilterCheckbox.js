import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <fieldset className='checkbox'>
      <label className='checkbox__lable' htmlFor='short-movies'>
        <input
          className='checkbox__input'
          type='checkbox'
          id='short-movies'
          checked={isChecked}
          onChange={handleCheck}
        />
        <div
          className={`checkbox__container ${
            isChecked && `checkbox__container_checked`
          }`}
        >
          <div className='checkbox__circle' />
        </div>
        <span>Короткометражки</span>
      </label>
    </fieldset>
  );
}

export default FilterCheckbox;
