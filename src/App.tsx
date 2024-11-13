import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import Details from './components/details-page/Details';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;