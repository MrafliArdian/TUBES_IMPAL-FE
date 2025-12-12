import React from 'react';
import NavBar from '../components/NavBar/NavBar.js';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
  return (
    <>
      <NavBar isLoggedIn={true} />
      
      <div className='dashboard-container'>
        
        <div className='welcome-banner'>
          <h2>Selamat Datang!</h2>
        </div>

        <div className='calculator-card'>
          <h3>Kalkulator Emas</h3>
          <p>Hitung nilai investasi emas Anda dalam Rupiah secara cepat dan akurat.</p>
          <button className='btn-calc' onClick={() => navigate('/emas')} style={{cursor: 'pointer'}}>Gunakan Kalkulator</button>
        </div>

        <div className='features-section'>
          <h4>Fitur Lain</h4>
          <div className='features-grid'>
            <div className='feature-item' onClick={() => navigate('/pendidikan')} style={{cursor: 'pointer'}}>
              <div className='icon-circle yellow-bg'>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <p>Pendidikan Anak</p>
            </div>
            <div className='feature-item' onClick={() => navigate('/simulasiKPR')} style={{cursor: 'pointer'}}>
              <div className='icon-circle red-bg'>
                <i className="fas fa-home"></i>
              </div>
              <p>Simulasi KPR</p>
            </div>
            <div className='feature-item' onClick={() => navigate('/danaDarurat')} style={{cursor: 'pointer'}}>
              <div className='icon-circle green-bg'>
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <p>Dana Darurat</p>
            </div>
            <div className='feature-item' onClick={() => navigate('/pensiun')} style={{cursor: 'pointer'}}>
              <div className='icon-circle teal-bg'>
                <i className="fas fa-piggy-bank"></i>
              </div>
              <p>Dana Pensiun</p>
            </div>
             <div className='feature-item' onClick={() => navigate('/menikah')} style={{cursor: 'pointer'}}>
              <div className='icon-circle gold-bg'>
                <i className="fas fa-ring"></i>
              </div>
              <p>Menikah</p>
            </div>
             <div className='feature-item' onClick={() => navigate('/kendaraan')} style={{cursor: 'pointer'}}>
              <div className='icon-circle dark-green-bg'>
                <i className="fas fa-car"></i>
              </div>
              <p>Kendaraan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;