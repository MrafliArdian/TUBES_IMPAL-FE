import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Menikah from './pages/Menikah';

const PublicLayout = () => {
  return (
    <>
      <NavBar /> 
      <Outlet /> 
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" exact Component={Home} />
          <Route path='/services' Component={Services}/>
          <Route path='/products' Component={Products}/>
          <Route path='/sign-up' Component={SignUp}/>
        </Route>

        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/menikah' Component={Menikah}/>
        
      </Routes>
    </Router>
  );
}

export default App;
