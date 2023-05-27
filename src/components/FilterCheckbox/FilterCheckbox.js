import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { handleChange, isChecked, isLoading } = props;

  return (
    <fieldset className='checkbox'>
      <label
        className={`checkbox__lable ${
          isLoading && 'checkbox__lable_inactive'
        }`}
        htmlFor='short-movies'
      >
        <input
          className='checkbox__input'
          type='checkbox'
          id='short-movies'
          checked={isChecked}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div
          className={`checkbox__container ${
            isLoading && 'checkbox__container_inactive'
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
