import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import './Menikah.css';
import { Button } from '../components/Button/Button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Menikah() {
  const { user } = useAuth();
  const [targetBiaya, setTargetBiaya] = useState('');
  const [uangSaatIni, setUangSaatIni] = useState('');
  const [investasiBulanan, setInvestasiBulanan] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');
  const [jangkaWaktu, setJangkaWaktu] = useState('');

  const [hasilInvestasi, setHasilInvestasi] = useState(0);
  const [status, setStatus] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHitung = async () => {
    setLoading(true);
    setError('');
    setShowResult(false);

    try {
        const payload = {
            target_cost: parseFloat(targetBiaya),
            current_saving: parseFloat(uangSaatIni),
            monthly_invest: parseFloat(investasiBulanan),
            expected_return_pct: parseFloat(returnInvestasi),
            months_to_event: parseInt(jangkaWaktu) * 12 // Convert years to months
        };

        const response = await api.post('menikah/', payload);
        const data = response.data;
        
        setHasilInvestasi(data.future_value);
        setStatus(data.is_suitable ? 'Cukup' : 'Kurang');
        setRecommendation(data.recommendation);
        setShowResult(true);

    } catch (err) {
        console.error(err);
        setError('Gagal menghitung. Periksa input atau koneksi server.');
    } finally {
        setLoading(false);
    }
  };


  return (
    <>
      <NavBar />
      
      <div className='menikah-container'>
        <div className='menikah-header'>
            <h1>Menikah</h1>
            <p>Hitung kebutuhan investasimu untuk mencapai biaya pernikahan yang diinginkan.</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
                
                <div className='form-group'>
                    <label>Target biaya menikah</label>
                    <input 
                    type="tel"
                    placeholder="Rp."
                    value={formatNumber(targetBiaya)}
                    onChange={(e) => {
                        const rawValue = unformatNumber(e.target.value);
                        if (!isNaN(rawValue)) {
                        setTargetBiaya(rawValue);
                        }
                    }}
                    />
                </div>

                <div className='form-group'>
                    <label>Uangmu Saat ini</label>
                    <input 
                        type="tel" 
                        placeholder="Rp." 
                        value={formatNumber(uangSaatIni)}
                        onChange={(e) => {
                        const rawValue = unformatNumber(e.target.value);
                        if (!isNaN(rawValue)) {
                        setUangSaatIni(rawValue);
                        }
                    }}
                    />
                </div>

                <div className='form-group'>
                    <label>Target investasi per bulan</label>
                    <input 
                        type="tel" 
                        placeholder="Rp." 
                        value={formatNumber(investasiBulanan)}
                        onChange={(e) => {
                        const rawValue = unformatNumber(e.target.value);
                        if (!isNaN(rawValue)) {
                        setInvestasiBulanan(rawValue);
                        }
                    }}
                    />
                </div>

                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Return Investasi</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="tel" 
                                placeholder="" 
                                value={returnInvestasi}
                                onChange={(e) => setReturnInvestasi(e.target.value)}
                            />
                            <span className="suffix">%/tahun</span>
                        </div>
                    </div>
                    <div className='form-group half-width'>
                        <label>target menikah dalam</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="tel" 
                                placeholder="" 
                                value={jangkaWaktu}
                                onChange={(e) => setJangkaWaktu(e.target.value)}
                            />
                            <span className="suffix">tahun</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='result-section'>
                <h2>Hasil Perhitungan</h2>
                
                <div className='result-item'>
                    <p className='label-result'>Total uang yang kamu butuhkan</p>
                    <h3>{targetBiaya ? formatRupiah(targetBiaya) : 'Rp -'}</h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Hasil Investasi</p>
                    <h3>{showResult ? formatRupiah(hasilInvestasi) : 'Rp -'}</h3>
                </div>

                {showResult && (
                    <>
                        <div className={`status-pill ${status === 'Cukup' ? 'success' : 'danger'}`}>
                            {status}
                        </div>
                        {recommendation && (
                            <div className="recommendation-box" style={{marginTop: '20px', padding: '10px', background: '#eef'}}>
                                <p><strong>Rekomendasi:</strong> {recommendation}</p>
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
                {loading ? 'Menghitung...' : 'Hitung'}
            </Button>
        </div>

      </div>
    </>
  )
}

export default Menikah;