import React, { useState } from "react";
import './Kendaraan.css';
import NavBar from "../components/NavBar/NavBar";
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import { Button } from "../components/Button/Button";
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Kendaraan() {
    const { user } = useAuth();
    const [hargaKendaraan, sethargaKendaraan] = useState('');
    const [DP, setDP] = useState('');
    const [uangSaatIni, setUang] = useState('');
    const [targetInvestasi, setTargetInvestasi] = useState('');
    const [returnInvestasi, setReturnInvestasi] = useState('');
    const [jangkaWaktu, setJangkaWaktu] = useState('');
  
    const [hasilInvestasi, setHasilInvestasi] = useState(0);
    const [targetDana, setTargetDana] = useState(0);
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
              vehicle_price: parseFloat(hargaKendaraan),
              down_payment: parseFloat(DP),
              current_saving: parseFloat(uangSaatIni),
              monthly_invest: parseFloat(targetInvestasi),
              expected_return_pct: parseFloat(returnInvestasi),
              investment_period_months: parseInt(jangkaWaktu)
          };

          const response = await api.post('kendaraan/', payload);
          const data = response.data;

          setTargetDana(data.needed_amount);
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
    }

  return (
    <>
        <NavBar />
        <div className="kendaraan-wrapper">
          <div className="kendaraan-header">
            <h1 > 
              Kendaraan
            </h1>
            <p> Hitung investasimu untuk mencapai biaya kendaraan impianmu</p>
          </div>

          <div className="kendaraan-isi">
            <div className="kendaraan-input">
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}

              <div className="kendaraan-formGroup">

                <label>Harga kendaraan impianmu</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(hargaKendaraan)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  sethargaKendaraan(rawValue);
                  }
                }}
                />
              </div>

              <div className="kendaraan-formGroup">

                <label>DP yang akan kamu bayar</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(DP)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  setDP(rawValue);
                  }
                }}
                />
              </div>

              <div className="kendaraan-formGroup">

                <label>Uangmu saat ini</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(uangSaatIni)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  setUang(rawValue);
                  }
                }}
                />
              </div>

              <div className="kendaraan-formGroup">

                <label>Target investasi per bulan</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(targetInvestasi)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  setTargetInvestasi(rawValue);
                  }
                }}
                />
              </div>

              <div className="kendaraan-formRow">

                <div className="kendaraan-formRowGroup">
                  <label>Return Investasi</label>
                  <div className="inputWSuffix">
                    <input 
                      type="tel" 
                      value={returnInvestasi}
                      onChange={(e) => setReturnInvestasi(e.target.value)}
                    />
                    <span className="suffix">%/Tahun</span>
                  </div>
                </div>

                <div className="kendaraan-formRowGroup">
                  <label>Investasi berapa Bulan</label>
                  <div className="inputWSuffix">
                    <input 
                    type="tel" 
                    value={jangkaWaktu}
                    onChange={(e) => setJangkaWaktu(e.target.value)}
                    />
                    <span className="suffix">Bulan</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="kendaraan-hasil">
              <h2>Hasil Perhitungan</h2>
                
                <div className='result-item'>
                    <p className='label-result'>Total uang yang kamu butuhkan</p>
                    <h3>{showResult ? formatRupiah(targetDana) : 'Rp -'}</h3>
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

  );
}