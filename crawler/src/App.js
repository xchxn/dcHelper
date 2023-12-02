import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './component/Navigation';
import Crawler from './component/Crawler';
import Dictionary from './component/Dictionary';
import WordClouding from './component/WordClouding';

function App() {
  return (
   <Router>
      <Navigation />
      <Routes >
        <Route path="/"/>
        <Route path="/Crawler" element={<Crawler />}/>
        <Route path="/Dictionary" element={<Dictionary />}/>
        <Route path="/WordClouding" element={<WordClouding />}/>
      </Routes >
    </Router>
  );
}

export default App;
