import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header /> 
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/movies'element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
