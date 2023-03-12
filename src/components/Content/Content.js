import Intro from '../Intro/Intro';
import About from '../About/About';
import './Content.css';

function Main() {
  return (
    <main className='content'>
      <Intro />
      <About />
      <section className='stack'></section>
      <section className='profile'></section>
    </main>
  );
}

export default Main;
