import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './component/Navigation';
import Crawler from './component/Crawler';
import Dictionary from './component/Dictionary';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes >
          <Route path="/" />
          <Route path="/Crawler" element={<Crawler />} />
          <Route path="/Dictionary" element={<Dictionary />} />
        </Routes >
      </Router>
      {/* <div>
        <p>디시인사이드 트렌드 검색기</p>
        <p>Crawler: 갤러리 주소를 입력하면 트렌드를 추출</p>
        <p>Dictionary: 갤러리 용어 입력/조회</p>
      </div> */}
    </div>
  );
}

export default App;
