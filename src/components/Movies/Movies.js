import { Form } from 'react-router-dom';
import './Movies.css';

function Movies() {
  return(
    <section className='movies'>
      <Form className='search'>
        <fieldset className='search__input-wrapper'>
          <input className='search__input' type='search' placeholder='Фильм' />
          <button className='search__submit-button' />
        </fieldset>
        <fieldset className='checkbox-wrapper'>
          <div>
            <div></div>
            <input type='checkbox'></input>
          </div>
          <label className='checkbox__lable'></label>
        </fieldset>
      </Form>
    </section>
  )
}

export default Movies;