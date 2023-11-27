import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './component/Navigation';
import Crawler from './component/Crawler';
import Dictionary from './component/Dictionary';

function App() {
  return (
   <Router>
      <Navigation />
      <Routes >
        <Route path="/"/>
        <Route path="/Crawler" element={<Crawler />}/>
        <Route path="/Dictionary" element={<Dictionary />}/>
      </Routes >
    </Router>
  );
}

export default App;
