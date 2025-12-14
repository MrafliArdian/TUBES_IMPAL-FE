import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import './DanaDarurat.css';
import { Button } from '../components/Button/Button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function DanaDarurat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pengeluaran, setPengeluaran] = useState('');
  const [targetBulan, setTargetBulan] = useState('');
  const [danaSaatIni, setDanaSaatIni] = useState('');
  const [investasiBulanan, setInvestasiBulanan] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');

  const [targetDana, setTargetDana] = useState(0);
  const [hasilInvestasi, setHasilInvestasi] = useState(0);
  const [status, setStatus] = useState(null);
  const [recommendation, setRecommendation] = useState(''); // New state
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [isHistoryMode, setIsHistoryMode] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  useEffect(() => {
    if (location.state && location.state.isHistory) {
      setIsHistoryMode(true);
      const data = location.state.historyData;
      
      setPengeluaran(data.monthly_expense);
      setTargetBulan(data.months_to_save);
      setDanaSaatIni(data.current_emergency_fund);
      setInvestasiBulanan(data.monthly_invest);
      setReturnInvestasi(data.expected_return_pct);

      setTargetDana(data.needed_fund);
      setHasilInvestasi(data.future_value);
      setStatus(data.is_suitable ? 'Cukup' : 'Kurang');
      setRecommendation(data.recommendation);
      setShowResult(true);
    }
  }, [location]);

  const handleHitung = async () => {
    if (isHistoryMode) {
      setIsHistoryMode(false);
      setShowResult(false);
      setPengeluaran('');
      setTargetBulan('');
      setDanaSaatIni('');
      setInvestasiBulanan('');
      setReturnInvestasi('');
      setRecommendation('');
      navigate('/dana-darurat', { replace: true, state: {} });
      return;
    }

    // Prepare payload
    // Prepare payload
    const payload = {
        monthly_expense: parseFloat(pengeluaran),
        months_to_save: parseInt(targetBulan),
        current_emergency_fund: parseFloat(danaSaatIni),
        monthly_invest: parseFloat(investasiBulanan),
        expected_return_pct: parseFloat(returnInvestasi)
    };

    setLoading(true);
    setError('');
    
    try {
        const response = await api.post('dana-darurat/', payload);
        const data = response.data;
        
        setTargetDana(data.needed_fund);
        setHasilInvestasi(data.future_value);
        setStatus(data.is_suitable ? 'Cukup' : 'Kurang');
        setRecommendation(data.recommendation);
        setShowResult(true);
    } catch (err) {
        console.error(err);
        setError('Gagal menghitung. Pastikan semua input valid atau server sedang berjalan.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      
      <div className='dana-container'>
        <div className='dana-header'>
            <h1>{isHistoryMode ? 'History Dana Darurat' : 'Dana Darurat'}</h1>
            <p className='subtitle-darurat'>
              {isHistoryMode 
                ? 'Hasil perhitungan yang sudah dihitung pada Dana Darurat' 
                : 'Hanya digunakan saat darurat, bukan untuk kebutuhan sehari-hari atau konsumsi'}
            </p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
                
                <div className='form-group'>
                    <label>Pengeluaran Wajib Bulanan</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={pengeluaran} 
                        onChange={(e) => setPengeluaran(e.target.value)}
                        disabled={isHistoryMode || loading} 
                    />
                </div>

                <div className='form-group'>
                    <label>Berapa bulan untuk mengumpulkan dana darurat</label>
                    <input 
                        type="number" 
                        value={targetBulan} 
                        onChange={(e) => setTargetBulan(e.target.value)} 
                        disabled={isHistoryMode || loading}
                    />
                </div>

                <div className='form-group'>
                    <label>Jumlah dana darurat yang dimiliki saat ini</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={danaSaatIni} 
                        onChange={(e) => setDanaSaatIni(e.target.value)} 
                        disabled={isHistoryMode || loading}
                    />
                </div>

                <div className='form-group'>
                    <label>Target investasi bulanan</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={investasiBulanan} 
                        onChange={(e) => setInvestasiBulanan(e.target.value)} 
                        disabled={isHistoryMode || loading}
                    />
                </div>

                <div className='form-group'>
                    <label>Kamu akan investasi di produk yang returnnya</label>
                    <div className="input-suffix-wrapper">
                        <input 
                            type="number" 
                            value={returnInvestasi} 
                            onChange={(e) => setReturnInvestasi(e.target.value)} 
                            disabled={isHistoryMode || loading}
                        />
                        <span className="suffix">%</span>
                    </div>
                </div>

            </div>

            <div className='result-section'>
                <div className='result-item'>
                    <p className='label-result'>Dana Darurat yang kamu butuhkan</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(targetDana) : 'RP -'}
                    </h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Hasil Investasi</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(hasilInvestasi) : 'RP -'}
                    </h3>
                </div>

                {showResult && (
                    <>
                        <div className={`status-pill ${status === 'Cukup' ? 'success' : 'danger'}`}>
                            {status}
                        </div>
                        {recommendation && (
                            <div className="recommendation-box" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #00c6ff'}}>
                                <h4>Rekomendasi</h4>
                                <p>{recommendation}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>

        <div className='button-container'>
          <Button 
          className='btn-hitung'
          buttonStyle='btn--hitung'
          buttonSize='btn--large'
          onClick={handleHitung}
          type='button'
          disabled={loading}
          >
            {loading ? 'Menghitung...' : (isHistoryMode ? 'Hitung Ulang' : 'Hitung')}
          </Button>
        </div>

      </div>
    </>
  )
}

export default DanaDarurat;