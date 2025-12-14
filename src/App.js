import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Menikah from './pages/Menikah';
import DanaPensiun from './pages/DanaPensiun';
import SignIn from './pages/SignIn';
import Kendaraan from './pages/Kendaraan';
import Pendidikan from './pages/Pendidikan'
import SimulasiKPR from './pages/SimulasiKPR';
import DanaDarurat from './pages/DanaDarurat'
import History from './pages/History';
import EditProfile from './pages/EditProfile';
import EditPassword from './pages/EditPassword'
import AdminPanel from './pages/AdminPanel'
import UploadArtikel from './pages/UploadArticle'
import KalkulatorEmas from './pages/KalkulatorEmas'

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
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" exact Component={Home} />
            <Route path='/sign-up' Component={SignUp}/>
            <Route path='/sign-in' Component={SignIn}/>
          </Route>

          <Route path='/dashboard' Component={Dashboard}/>
          <Route path='/menikah' Component={Menikah}/>
          <Route path='/pensiun' Component={DanaPensiun}/>
          <Route path='/kendaraan' Component={Kendaraan}/>
          <Route path='/pendidikan' Component={Pendidikan}/>
          <Route path='/simulasiKPR' Component={SimulasiKPR}/>
          {/* Duplicate route removed */}
          <Route path='/danaDarurat' Component={DanaDarurat}/>
          <Route path='/history' Component={History}/>
          <Route path='/editProfile' Component={EditProfile}/>
          <Route path='/editPass' Component={EditPassword}/>
          <Route path='/admin-panel' Component={AdminPanel}/>
          <Route path='/upload-artikel' Component={UploadArtikel}/>
          <Route path='/Emas' Component={KalkulatorEmas}/>
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
