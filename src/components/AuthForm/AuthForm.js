import { Link } from 'react-router-dom';
import './AuthForm.css';

function AuthForm(props) {
  const { headingText, handleSubmit } = props;

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <Link className='app__logo' to={'/'} />
      <h2 className='auth-form__heading'>{headingText}</h2>
      {props.children}
    </form>
  );
}

export default AuthForm;
