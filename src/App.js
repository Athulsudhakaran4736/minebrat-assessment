import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';
import ListComponent from './components/ListComponent';
import SelectedInfo from './components/SelectedInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='list-container'>
          <Routes>
          <Route path="/" element={<ListComponent />} />
          <Route path="/selected-info/:state/:city" element={<SelectedInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

