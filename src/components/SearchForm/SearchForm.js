import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm(props) {
  const { handleSubmit } = props;
  const [value, setValue] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(value, isCheckboxChecked)
  };

  function handleChange(e) {
    return setValue(e.target.value);
  };

  function handleCheckboxChange() {
    return setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <form className='search-form' onSubmit={handleFormSubmit}>
      <fieldset className='search-form__input-wrapper'>
        <input
          className='search-form__input'
          type='search-form'
          placeholder='Фильм'
          required
          onChange={handleChange}
        />
        <button className='search-form__submit-button' />
      </fieldset>
      <FilterCheckbox handleChange={handleCheckboxChange} isChecked={isCheckboxChecked} />
    </form>
  );
}

export default SearchForm;
