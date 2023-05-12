import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { handleChange, isChecked } = props;
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);

  return (
    <fieldset className='checkbox'>
      <label
        className={`checkbox__lable ${
          isCheckboxDisabled && 'checkbox__lable_inactive'
        }`}
        htmlFor='short-movies'
      >
        <input
          className='checkbox__input'
          type='checkbox'
          id='short-movies'
          checked={isChecked}
          onChange={handleChange}
          disabled={isCheckboxDisabled}
        />
        <div
          className={`checkbox__container ${
            isCheckboxDisabled && 'checkbox__container_inactive'
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
