import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './Pendidikan.css';
import { Button } from '../components/Button/Button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Pendidikan() {
  const { user } = useAuth();
  const [usiaAnakSekarang, setUsiaAnakSekarang] = useState('');
  const [usiaMasukKuliah, setUsiaMasukKuliah] = useState('');
  const [biayaPerTahun, setBiayaPerTahun] = useState('');
  const [lamaKuliah, setLamaKuliah] = useState('');
  const [inflasi, setInflasi] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');
  const [danaSaatIni, setDanaSaatIni] = useState('');
  const [investasiBulanan, setInvestasiBulanan] = useState('');

  const [totalBiayaMasaDepan, setTotalBiayaMasaDepan] = useState(0);
  const [hasilInvestasi, setHasilInvestasi] = useState(0);
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
            child_age_years: parseInt(usiaAnakSekarang),
            college_entry_age: parseInt(usiaMasukKuliah),
            current_tuition_per_year: parseFloat(biayaPerTahun),
            college_duration_years: parseInt(lamaKuliah),
            education_inflation_pct: parseFloat(inflasi),
            expected_return_pct: parseFloat(returnInvestasi),
            current_saving: parseFloat(danaSaatIni),
            monthly_invest: parseFloat(investasiBulanan)
        };

        const response = await api.post('pendidikan-anak/', payload);
        const data = response.data;

        setTotalBiayaMasaDepan(data.total_education_need);
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
      
      <div className='pendidikan-container'>
        <div className='pendidikan-header'>
            <h1>Pendidikan Anak</h1>
            <p>Hitung kebutuhan dana pendidikan anak anda di masa depan</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
                
                <h3 className='section-title'>Data Anak</h3>
                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Usia anak sekarang</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                value={usiaAnakSekarang} 
                                onChange={(e) => setUsiaAnakSekarang(e.target.value)} 
                            />
                            <span className="suffix">tahun</span>
                        </div>
                    </div>
                    <div className='form-group half-width'>
                        <label>Usia anak saat masuk kuliah</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                value={usiaMasukKuliah} 
                                onChange={(e) => setUsiaMasukKuliah(e.target.value)} 
                            />
                            <span className="suffix">tahun</span>
                        </div>
                    </div>
                </div>

                <h3 className='section-title'>Biaya Kuliah Saat Ini</h3>
                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Biaya per tahun</label>
                        <input 
                            type="number" 
                            placeholder="Rp."
                            value={biayaPerTahun} 
                            onChange={(e) => setBiayaPerTahun(e.target.value)} 
                        />
                    </div>
                    <div className='form-group half-width'>
                        <label>Perkiraan lama Kuliah</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                value={lamaKuliah} 
                                onChange={(e) => setLamaKuliah(e.target.value)} 
                            />
                            <span className="suffix">tahun</span>
                        </div>
                    </div>
                </div>

                <h3 className='section-title'>Kondisi Keuangan & Asumsi</h3>
                 <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Dana saat ini</label>
                         <input 
                            type="number" 
                            placeholder="Rp."
                            value={danaSaatIni} 
                            onChange={(e) => setDanaSaatIni(e.target.value)} 
                        />
                    </div>
                    <div className='form-group half-width'>
                        <label>Investasi Rutin Bulanan</label>
                         <input 
                            type="number" 
                            placeholder="Rp."
                            value={investasiBulanan} 
                            onChange={(e) => setInvestasiBulanan(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='form-group half-width'>
                        <label>Inflasi Pendidikan</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                value={inflasi} 
                                onChange={(e) => setInflasi(e.target.value)} 
                            />
                            <span className="suffix">%</span>
                        </div>
                    </div>
                    <div className='form-group half-width'>
                        <label>Return Investasi</label>
                        <div className="input-suffix-wrapper">
                            <input 
                                type="number" 
                                value={returnInvestasi} 
                                onChange={(e) => setReturnInvestasi(e.target.value)} 
                            />
                            <span className="suffix">%</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='result-section'>
                <div className='result-item'>
                    <p className='label-result'>Total biaya kuliah kelak</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(totalBiayaMasaDepan) : 'Rp -'}
                    </h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Nilai Aset Nanti (FV)</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(hasilInvestasi) : 'Rp -'}
                    </h3>
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

export default Pendidikan;