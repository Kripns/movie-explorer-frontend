import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const { handleSubmit, searchValue, checkboxValue } = props;
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

  useEffect(() => {
    if(searchValue && searchValue !== null) setValue(searchValue)
  }, [searchValue])

  useEffect(() => {
    if(checkboxValue && checkboxValue !== null) setIsCheckboxChecked(checkboxValue)
  }, [checkboxValue])

  return (
    <form className='search-form' onSubmit={handleFormSubmit}>
      <fieldset className='search-form__input-wrapper'>
        <input
          className='search-form__input'
          type='search-form'
          placeholder='Фильм'
          required
          onChange={handleChange}
          value={value || ''}
        />
        <button className='search-form__submit-button' />
      </fieldset>
      <FilterCheckbox handleChange={handleCheckboxChange} isChecked={isCheckboxChecked} />
    </form>
  );
}

export default SearchForm;
