import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className='error-page'>
      <h2 className='error-page__heading'>404</h2>
      <p className='error-page__subheading'>Страница не найдена</p>
      <button className='error-page__button' onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default ErrorPage;