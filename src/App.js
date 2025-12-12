import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Menikah from './pages/Menikah';
import DanaPensiun from './pages/DanaPensiun';
import SignIn from './pages/SignIn';
import Method from './pages/ChooseMethod';
import Kendaraan from './pages/Kendaraan';
import Pendidikan from './pages/Pendidikan'
import SimulasiKPR from './pages/SimulasiKPR';
import DanaDarurat from './pages/DanaDarurat'
import History from './pages/History';

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
        <Route path='/kendaraan' Component={Kendaraan}/>
        <Route path='/pendidikan' Component={Pendidikan}/>
        <Route path='/simulasiKPR' Component={SimulasiKPR}/>
        <Route path='/simulasiKPR' Component={SimulasiKPR}/>
        <Route path='/danaDarurat' Component={DanaDarurat}/>
        <Route path='/history' Component={History}/>

      </Routes>
    </Router>
  );
}

export default App;
