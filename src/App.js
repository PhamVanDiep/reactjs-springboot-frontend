import './App.css';
import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTutorial from './ListTutorial';
import TutorialEditor from './TutorialEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/tutorials' exact='true' element={<ListTutorial />} />
        <Route path='/tutorials/:id' element={<TutorialEditor />} />
      </Routes>
    </Router>
  );  
}

export default App;
