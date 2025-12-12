import React, { useState } from "react";
import './Kendaraan.css';
import NavBar from "../components/NavBar/NavBar";
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import { Button } from "../components/Button/Button";

export default function Kendaraan() {
    const [hargaKendaraan, sethargaKendaraan] = useState('');
    const [DP, setDP] = useState('');
    const [uangSaatIni, setUang] = useState('');
    const [targetInvestasi, setTargetInvestasi] = useState('');
    const [returnInvestasi, setReturnInvestasi] = useState('');
  
    const [hasilInvestasi, setHasilInvestasi] = useState(0);
    const [status, setStatus] = useState(null);
    const [showResult, setShowResult] = useState(false);
  
    const handleHitung = () => {
      setStatus('Cukup')
      setShowResult(true);
    }
  return (
    <>
        <NavBar isLoggedIn={true} />
        <div class="kendaraan-wrapper">
          <div class="kendaraan-header">
            <h1 > 
              Kendaraan
            </h1>
            <p> Hitung investasimu untuk mencapai biaya kendaraan impianmu</p>
          </div>

          <div class="kendaraan-isi">
            <div class="kendaraan-input">

              <div class="kendaraan-formGroup">

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

              <div class="kendaraan-formGroup">

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

              <div class="kendaraan-formGroup">

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

              <div class="kendaraan-formGroup">

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

              <div class="kendaraan-formRow">

                <div class="kendaraan-formRowGroup">
                  <label>Return Investasi</label>
                  <div class="inputWSuffix">
                    <input 
                      type="tel" 
                      value={returnInvestasi}
                      onChange={(e) => setReturnInvestasi(e.target.value)}
                    />
                    <span className="suffix">%/Tahun</span>
                  </div>
                </div>

                <div class="kendaraan-formRowGroup">
                  <label>Investasi berapa Bulan</label>
                  <div class="inputWSuffix">
                    <input 
                    type="tel" 
                    value={returnInvestasi}
                    onChange={(e) => setReturnInvestasi(e.target.value)}
                    />
                    <span className="suffix">Bulan</span>
                  </div>
                </div>
              </div>

            </div>

            <div class="kendaraan-hasil">
              <h2>Hasil Perhitungan</h2>
                
                <div className='result-item'>
                    <p className='label-result'>Total uang yang kamu butuhkan</p>
                    <h3>{hargaKendaraan ? formatRupiah(hargaKendaraan) : 'Rp -'}</h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Hasil Investasi</p>
                    <h3>{showResult ? formatRupiah(hasilInvestasi) : 'Rp -'}</h3>
                </div>

                {showResult && (
                    <div className={`status-pill ${status === 'Cukup' ? 'success' : 'danger'}`}>
                        {status}
                    </div>
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
            >
                Hitung
            </Button>
          </div>
        </div>
    </>

  );
}