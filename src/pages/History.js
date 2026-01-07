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

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) {
        if (minutes % 60 > 0) return `${hours}h ${minutes % 60}m ago`;
        return `${hours}h ago`;
    }
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const formatCalculatorName = (type) => {
      switch(type) {
          case 'emergency_fund': return 'Dana Darurat';
          case 'pension': return 'Dana Pensiun';
          case 'marriage': return 'Menikah';
          case 'education': return 'Pendidikan Anak';
          case 'kpr': return 'Simulasi KPR';
          case 'gold': return 'Kalkulator Emas';
          case 'vehicle': return 'Kendaraan';
          default: return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
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
                        <h3>{item.calculator_name || formatCalculatorName(item.calculator_type)}</h3>
                        <span className="history-date">{timeAgo(item.date)}</span>
                    </div>
                    <button 
                        className="btn-cek-hasil"
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