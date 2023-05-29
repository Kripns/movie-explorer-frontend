import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const { getCheckboxValue, handleSubmit, searchValue, checkboxValue, isLoading } = props;
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

//заполняем инпут чекбокс из ЛС
  useEffect(() => {
    if(searchValue && searchValue !== null) setValue(searchValue)
  }, [searchValue])

  useEffect(() => {
    if(checkboxValue && checkboxValue !== null) setIsCheckboxChecked(checkboxValue)
  }, [checkboxValue])

//получаем чекбокс при его изменении и сохраняем в стэйт
  useEffect(() => {
    getCheckboxValue(isCheckboxChecked);
  }, [isCheckboxChecked])

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
      <FilterCheckbox handleChange={handleCheckboxChange} isChecked={checkboxValue} isLoading={isLoading}/>
    </form>
  );
}

export default SearchForm;
