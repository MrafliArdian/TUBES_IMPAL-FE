import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import './History.css';

function History() {
  const navigate = useNavigate();

  const dummyData = [
    {
      id: 1,
      type: 'Pendidikan Anak',
      date: '1m ago',
      path: '/pendidikan',
      data: {
        usiaAnakSekarang: 5,
        usiaMasukKuliah: 18,
        biayaPerTahun: 15000000,
        lamaKuliah: 4,
        inflasi: 5,
        returnInvestasi: 10
      }
    },
    {
      id: 2,
      type: 'Simulasi KPR',
      date: '1h 12m ago',
      path: '/simulasi-kpr',
      data: {
        hargaProperti: 500000000,
        dpPercent: 20,
        tenorBulan: 120,
        bungaFix: 5
      }
    },
    {
      id: 3,
      type: 'Dana Darurat',
      date: '1h 15m ago',
      path: '/dana-darurat',
      data: {
        pengeluaran: 1500000,
        targetBulan: 10,
        danaSaatIni: 1500000,
        investasiBulanan: 1500000,
        returnInvestasi: 10
      }
    },
    {
      id: 4,
      type: 'Menikah',
      date: '1h 20m ago',
      path: '/menikah',
      data: {
        targetBiaya: 100000000,
        uangSaatIni: 10000000
      }
    }
  ];

  const handleCekHasil = (item) => {
    navigate(item.path, { 
      state: { 
        isHistory: true, 
        historyData: item.data 
      } 
    });
  };

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className='history-container'>
        <div className='history-header'>
            <h1>History</h1>
            <p>Cek hasil perhitungan kamu yang sebelumnya</p>
        </div>

        <div className='history-list'>
            {dummyData.map((item) => (
                <div key={item.id} className='history-item'>
                    <div className='history-info'>
                        <h3>{item.type}</h3>
                        <span>{item.date}</span>
                    </div>
                    <button 
                        className='btn-cek-hasil'
                        onClick={() => handleCekHasil(item)}
                    >
                        Cek Hasil
                    </button>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default History;