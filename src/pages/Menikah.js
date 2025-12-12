import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import './Menikah.css';
import { Button } from '../components/Button/Button';

function Menikah() {
  const [targetBiaya, setTargetBiaya] = useState('');
  const [uangSaatIni, setUangSaatIni] = useState('');
  const [investasiBulanan, setInvestasiBulanan] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');
  const [jangkaWaktu, setJangkaWaktu] = useState('');

  const [hasilInvestasi, setHasilInvestasi] = useState(0);
  const [status, setStatus] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleHitung = () => {
    const principal = parseFloat(uangSaatIni) || 0;
    const monthlyContribution = parseFloat(investasiBulanan) || 0;
    const ratePerYear = parseFloat(returnInvestasi) || 0;
    const years = parseFloat(jangkaWaktu) || 0;
    const target = parseFloat(targetBiaya) || 0;

    const ratePerMonth = (ratePerYear / 100) / 12;
    const totalMonths = years * 12;

    let futureValue = 0;

    if (ratePerYear === 0) {
      futureValue = principal + (monthlyContribution * totalMonths);
    } else {
      futureValue = 
        principal * Math.pow(1 + ratePerMonth, totalMonths) +
        (monthlyContribution * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth));
    }

    setHasilInvestasi(futureValue);
    
    if (futureValue >= target) {
      setStatus('Cukup');
    } else {
      setStatus('Kurang');
    }
    
    setShowResult(true);
  };


  return (
    <>
      <NavBar isLoggedIn={true} />
      
      <div className='menikah-container'>
        <div className='menikah-header'>
            <h1>Menikah</h1>
            <p>Hitung kebutuhan investasimu untuk mencapai biaya pernikahan yang diinginkan.</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                
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
  )
}

export default Menikah;