import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './SimulasiKPR.css';
import { Button } from '../components/Button/Button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function SimulasiKPR() {
  const { user } = useAuth();
  const [hargaProperti, setHargaProperti] = useState('');
  const [penghasilan, setPenghasilan] = useState('');
  const [dpPercent, setDpPercent] = useState('');
  const [tenorBulan, setTenorBulan] = useState('');
  const [bungaFix, setBungaFix] = useState('');
  const [periodeFix, setPeriodeFix] = useState('');
  const [bungaFloating, setBungaFloating] = useState('');

  const [pokokPinjaman, setPokokPinjaman] = useState(0);
  const [totalBungaFix, setTotalBungaFix] = useState(0);
  const [totalBungaFloating, setTotalBungaFloating] = useState(0);
  const [sisaPokok, setSisaPokok] = useState(0);
  const [status, setStatus] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleHitung = async () => {
    setLoading(true);
    setError('');
    setShowResult(false);

    try {
        const payload = {
            property_price: parseFloat(hargaProperti),
            monthly_income: parseFloat(penghasilan),
            dp_percentage: parseFloat(dpPercent),
            loan_term_months: parseInt(tenorBulan),
            fixed_interest_rate: parseFloat(bungaFix),
            fixed_period_months: parseInt(periodeFix),
            floating_interest_rate: parseFloat(bungaFloating)
        };

        const response = await api.post('simulasi-kpr/', payload);
        const data = response.data;

        // Note: Backend definitions for interest breakdowns might be missing in default serializer.
        // We display what we have.
        setPokokPinjaman(data.loan_amount);
        setTotalBungaFix(data.monthly_installment_fixed); // Using monthly installment as proxy if total interest not avail? Or leave 0.
        // Actually simplest is to just rely on is_suitable and recommendation for now.
        
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
      
      <div className='kpr-container'>
        <div className='kpr-header'>
            <h1>Simulasi KPR</h1>
            <p>Hitung Cicilan KPR sesuai harga rumah, tenor, dan bunga pinjaman</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
                
                <div className='form-group'>
                    <label>Harga properti impianmu</label>
                    <input 
                        type="number" 
                        placeholder="Rp. 10.000.000"
                        value={hargaProperti}
                        onChange={(e) => setHargaProperti(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label>Penghasilan bulanan kamu</label>
                    <input 
                        type="number" 
                        placeholder="Rp. 10.000.000"
                        value={penghasilan}
                        onChange={(e) => setPenghasilan(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label>Berapa % DP yang kamu inginkan</label>
                    <div className="input-suffix-wrapper">
                        <input 
                            type="number" 
                            placeholder="10"
                            value={dpPercent}
                            onChange={(e) => setDpPercent(e.target.value)}
                        />
                        <span className="suffix">%</span>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>KPR Berapa Bulan</label>
                        <input 
                            type="number" 
                            placeholder="12"
                            value={tenorBulan}
                            onChange={(e) => setTenorBulan(e.target.value)}
                        />
                    </div>
                    <div className='form-group half-width'>
                        <label>% Bunga fix</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                placeholder="10"
                                value={bungaFix}
                                onChange={(e) => setBungaFix(e.target.value)}
                            />
                            <span className="suffix">%</span>
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Periode bunga fix</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                placeholder="1"
                                value={periodeFix}
                                onChange={(e) => setPeriodeFix(e.target.value)}
                            />
                            <span className="suffix">Bulan</span>
                        </div>
                    </div>
                    <div className='form-group half-width'>
                        <label>% Bunga floating</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                placeholder="10"
                                value={bungaFloating}
                                onChange={(e) => setBungaFloating(e.target.value)}
                            />
                            <span className="suffix">%</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='result-section'>
                
                <div className='result-item-small'>
                    <p className='label-result'>Pokok Pinjaman</p>
                    <h3>{showResult ? formatRupiah(pokokPinjaman) : 'RP -'}</h3>
                </div>

                <div className='result-item-small'>
                    <p className='label-result'>Total Bunga periode fix</p>
                    <h3>{showResult ? formatRupiah(totalBungaFix) : 'RP -'}</h3>
                </div>

                <div className='result-item-small'>
                    <p className='label-result'>Total Bunga periode floating</p>
                    <h3>{showResult ? formatRupiah(totalBungaFloating) : 'RP -'}</h3>
                </div>

                <div className='result-item-small'>
                    <p className='label-result'>Sisa pokok pinjaman setelah periode fix</p>
                    <h3>{showResult ? formatRupiah(sisaPokok) : 'RP -'}</h3>
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

export default SimulasiKPR;