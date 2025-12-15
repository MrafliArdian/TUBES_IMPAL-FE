import React, { useState } from "react";
import "./DanaPensiun.css";
import NavBar from "../components/NavBar/NavBar";
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import { Button } from "../components/Button/Button";
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DanaPensiun() {
  const { user } = useAuth();
  const [pengeluaranBulanan, setPengeluaranBulanan] = useState('');
  const [danaTersedia, setDanaTersedia] = useState('');
  const [targetInvestasi, setTargetInvestasi] = useState('');
  const [usia, setUsia] = useState('');
  const [usiaPensiun, setUsiaPensiun] = useState('');
  const [lamaPensiun, setLamaPensiun] = useState('20'); // Default 20
  const [inflasi, setInflasi] = useState('3'); // Default 3%
  const [returnInvestasi, setReturnInvestasi] = useState('');

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
            current_age: parseInt(usia),
            retire_age: parseInt(usiaPensiun),
            pension_years: parseInt(lamaPensiun),
            monthly_expense_now: parseFloat(pengeluaranBulanan),
            inflation_pct: parseFloat(inflasi),
            expected_return_pct: parseFloat(returnInvestasi),
            monthly_invest: parseFloat(targetInvestasi)
        };

        const response = await api.post('dana-pensiun/', payload);
        const data = response.data;

        setTargetDana(data.total_need_at_retire);
        setHasilInvestasi(data.estimated_portfolio);
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
        <div className="pensiun-wrapper">
          <div className="pensiun-header">
            <h1 > 
              Dana Pensiun
            </h1>
            <p> <strong>Hanya digunakan setelah pensiun</strong>, bukan untuk kebutuhan harian saat masih produktif</p>
          </div>

          <div className="pensiun-isi">
            <div className="pensiun-input">
                {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}

              <div className="pensiun-formGroup">

                <label>Pengeluaran bulanan saat ini</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(pengeluaranBulanan)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  setPengeluaranBulanan(rawValue);
                  }
                }}
                />
              </div>

              <div className="pensiun-formGroup">

                <label>Dana pensiun yang sudah tersedia</label>
                <input 
                type="tel" 
                placeholder="Rp."
                value={formatNumber(danaTersedia)}
                onChange={(e) => {
                  const rawValue = unformatNumber(e.target.value);
                  if (!isNaN(rawValue)) {
                  setDanaTersedia(rawValue);
                  }
                }}
                />
              </div>

              <div className="pensiun-formGroup">

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

              <div className="pensiun-formRow">

                <div className="pensiun-formRowGroup">
                  <label>Usiamu saat ini</label>
                  <div className="inputWSuffix">
                    <input 
                      type="tel" 
                      value={usia}
                      onChange={(e) => setUsia(e.target.value)}
                    />
                    <span className="suffix">Tahun</span>
                  </div>
                </div>

                <div className="pensiun-formRowGroup">
                  <label>Pensiun di usia</label>
                  <div className="inputWSuffix">
                    <input 
                    type="tel" 
                    value={usiaPensiun}
                    onChange={(e) => setUsiaPensiun(e.target.value)}
                    />
                    <span className="suffix">Tahun</span>
                  </div>
                </div>
              </div>


              <div className="pensiun-formRow">
                 <div className="pensiun-formRowGroup">
                  <label>Lama masa pensiun</label>
                  <div className="inputWSuffix">
                    <input 
                    type="tel" 
                    value={lamaPensiun}
                    onChange={(e) => setLamaPensiun(e.target.value)}
                    />
                    <span className="suffix">Tahun</span>
                  </div>
                </div>

                <div className="pensiun-formRowGroup">
                   <label>Asumsi Inflasi</label>
                   <div className="inputWSuffix">
                    <input 
                    type="tel" 
                    value={inflasi}
                    onChange={(e) => setInflasi(e.target.value)}
                    />
                    <span className="suffix">%/Thn</span>
                  </div>
                </div>
              </div>

              <div className="pensiun-formBottom">
                <div className="pensiun-formBottomGroup">
                  <label>Target return investasi</label>
                  <div className="inputWSuffix">
                    <input 
                    type="tel" 
                    value={returnInvestasi}
                    onChange={(e) => setReturnInvestasi(e.target.value)}
                    />
                    <span className="suffix">%/Tahun</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pensiun-hasil">
              <h2>Hasil Perhitungan</h2>
                
                <div className='result-item'>
                    <p className='label-result'>Total uang yang dibutuhkan nanti</p>
                    <h3>{showResult ? formatRupiah(targetDana) : 'Rp -'}</h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Nilai Investasi Nanti (FV)</p>
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