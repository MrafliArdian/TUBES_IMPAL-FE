import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import './History.css';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function History() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
        try {
            const response = await api.get('history/');
            // Backend returns: { count: N, history: [...] }
            setHistoryItems(response.data.history || []);
        } catch (err) {
            console.error(err);
            setError('Gagal memuat history.');
        } finally {
            setLoading(false);
        }
    };
    
    if (user) {
        fetchHistory();
    }
  }, [user]);

  const handleCekHasil = (item) => {
    let path = '/dashboard'; // Default fallback
    
    switch(item.calculator_type) {
        case 'emergency_fund': path = '/dana-darurat'; break;
        case 'pension': path = '/dana-pensiun'; break;
        case 'marriage': path = '/menikah'; break;
        case 'education': path = '/pendidikan'; break;
        case 'kpr': path = '/simulasi-kpr'; break;
        case 'gold': path = '/kalkulator-emas'; break;
        case 'vehicle': path = '/kendaraan'; break;
        default: break;
    }
    
    // Pass FULL item data to the state so the page can reconstruct it if needed, 
    // BUT typically history just shows the result. For now, we navigate.
    // Ideally, the calculator pages should support "View Mode" based on passed state.
    navigate(path, { 
      state: { 
        isHistory: true, 
        historyData: item
      } 
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <NavBar isLoggedIn={!!user} />
      <div className='history-container'>
        <div className='history-header'>
            <h1>History</h1>
            <p>Cek hasil perhitungan kamu yang sebelumnya</p>
        </div>

        <div className='history-list'>
            {loading && <p>Memuat...</p>}
            {error && <p className="error">{error}</p>}
            
            {!loading && historyItems.length === 0 && (
                <p>Belum ada riwayat perhitungan.</p>
            )}

            {historyItems.map((item) => (
                <div key={item.id} className='history-item'>
                    <div className='history-info'>
                        <div className="history-top">
                            <h3>{item.calculator_name}</h3>
                            <span className="history-date">{formatDate(item.date)}</span>
                        </div>
                        <p className="history-summary">{item.summary}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default History;