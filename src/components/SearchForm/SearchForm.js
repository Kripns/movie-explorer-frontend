import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form className='search-form'>
      <fieldset className='search-form__input-wrapper'>
        <input
          className='search-form__input'
          type='search-form'
          placeholder='Фильм'
          required
        />
        <button className='search-form__submit-button' />
      </fieldset>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
