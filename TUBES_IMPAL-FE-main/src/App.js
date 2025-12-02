import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Menikah from './pages/Menikah';
import Pendidikan from './pages/Pendidikan';
import DanaPensiun from './pages/DanaPensiun';
import SimulasiKPR from './pages/SimulasiKPR';
import DanaDarurat from './pages/DanaDarurat';
import History from './pages/History';
import SignIn from './pages/SignIn';
import Method from './pages/ChooseMethod';

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
          <Route path='/sign-up' Component={SignUp}/>
          <Route path='/sign-in' Component={SignIn}/>
          <Route path='/choose' Component={Method}/>
        </Route>

        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/menikah' Component={Menikah}/>
        <Route path='/pensiun' Component={DanaPensiun}/>
        <Route path='/pendidikan' Component={Pendidikan}/>
        <Route path='/simulasi-kpr' Component={SimulasiKPR}/>
        <Route path='/dana-darurat' Component={DanaDarurat}/>
        <Route path='/history' Component={History}/>
        

        
      </Routes>
    </Router>
  );
}

export default App;
