import React, { useState } from "react";
import "./DanaPensiun.css";
import NavBar from "../components/NavBar/NavBar";
import { formatNumber, unformatNumber } from "../FormatNum";

export default function DanaPensiun() {
  const [pengeluaranBulanan, setPengeluaranBulanan] = useState('');
  const [danaTersedia, setDanaTersedia] = useState('');
  const [targetInvestasi, setTargetInvestasi] = useState('');
  const [usia, setUsia] = useState('');
  const [usiaPensiun, setUsiaPensiun] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');

  const [hasilInvestasi, setHasilInvestasi] = useState(0);
    const [status, setStatus] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <>
        <NavBar isLoggedIn={true} />
        <div class="pensiun-wrapper">
          <div class="pensiun-header">
            <h1 > 
              Dana Pensiun
            </h1>
            <p> <strong>Hanya digunakan setelah pensiun</strong>, bukan untuk kebutuhan harian saat masih produktif</p>
          </div>

          <div class="pensiun-isi">
            <div class="pensiun-input">

              <div class="pensiun-formGroup">

                <label>Pengeluaran bulanan</label>
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

              <div class="pensiun-formGroup">

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

              <div class="pensiun-formGroup">

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

              <div class="pensiun-formRow">

                <div class="pensiun-formRowGroup">
                  <label>Usiamu saat ini</label>
                  <div class="inputWSuffix">
                    <input 
                      type="tel" 
                      value={usia}
                      onChange={(e) => setUsia(e.target.value)}
                    />
                    <span className="suffix">Tahun</span>
                  </div>
                </div>

                <div class="pensiun-formRowGroup">
                  <label>Kamu ingin pensiun di usia</label>
                  <div class="inputWSuffix">
                    <input 
                    type="tel" 
                    value={usiaPensiun}
                    onChange={(e) => setUsiaPensiun(e.target.value)}
                    />
                    <span className="suffix">Tahun</span>
                  </div>
                </div>
              </div>

              <div class="pensiun-formBottom">
                <div class="pensiun-formBottomGroup">
                  <label>Target return investasi</label>
                  <div class="inputWSuffix">
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

            <div class="pensiun-hasil">
              <h2>Hasil Perhitungan</h2>
                
                <div className='result-item'>
                    <p className='label-result'>Total uang yang kamu butuhkan</p>
                    <h3>{pengeluaranBulanan ? formatRupiah(pengeluaranBulanan) : 'Rp -'}</h3>
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
        </div>
    </>

  );
}