import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './component/Navigation';
import Crawler from './component/Crawler';
import Dictionary from './component/Dictionary';
import Home from './component/Home';

function App() {
  return (
    <div>
      <Router>
        <header>
          <Navigation />
        </header>
        <Routes >
          <Route path="/Home" element={<Home />}/>
          <Route path="/Crawler" element={<Crawler />} />
          <Route path="/Dictionary" element={<Dictionary />} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;
