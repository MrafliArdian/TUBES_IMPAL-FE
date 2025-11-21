import React from 'react';
import './App.css';
import NavBar from './component/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Pages/Home'
import Services from './component/Pages/Services'
import Products from './component/Pages/Products'
import SignUp from './component/Pages/SignUp'


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path='/services' Component={Services}/>
        <Route path='/products' Component={Products}/>
        <Route path='/sign-up' Component={SignUp}/>
      </Routes>
    </Router>
  );
}

export default App;
