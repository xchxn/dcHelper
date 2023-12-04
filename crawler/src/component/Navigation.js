import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav id="nav2">
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Crawler">Trend</Link>
        </li>
        <li>
          <Link to="/Dictionary">Dictionary</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
