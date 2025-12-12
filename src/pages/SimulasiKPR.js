import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './SimulasiKPR.css';
import { Button } from '../components/Button/Button';

function SimulasiKPR() {
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
  const [showResult, setShowResult] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const calculatePMT = (rate, nper, pv) => {
    if (rate === 0) return pv / nper;
    return (pv * rate) / (1 - Math.pow(1 + rate, -nper));
  };

  const handleHitung = () => {
    const price = parseFloat(hargaProperti) || 0;
    const income = parseFloat(penghasilan) || 0;
    const dp = parseFloat(dpPercent) || 0;
    const totalTenor = parseFloat(tenorBulan) || 0;
    const rateFixYear = parseFloat(bungaFix) || 0;
    const fixPeriod = parseFloat(periodeFix) || 0;
    const rateFloatYear = parseFloat(bungaFloating) || 0;

    if (fixPeriod > totalTenor) {
      alert("Periode bunga fix tidak boleh lebih lama dari total tenor KPR");
      return;
    }

    const downPaymentAmount = price * (dp / 100);
    const loanAmount = price - downPaymentAmount;

    const rateFixMonth = (rateFixYear / 100) / 12;
    const monthlyInstallmentFix = calculatePMT(rateFixMonth, totalTenor, loanAmount);

    let currentBalance = loanAmount;
    let accumulatedInterestFix = 0;

    for (let i = 0; i < fixPeriod; i++) {
      const interestPortion = currentBalance * rateFixMonth;
      const principalPortion = monthlyInstallmentFix - interestPortion;
      accumulatedInterestFix += interestPortion;
      currentBalance -= principalPortion;
    }

    const balanceAfterFix = currentBalance;

    const remainingTenor = totalTenor - fixPeriod;
    let accumulatedInterestFloat = 0;
    let monthlyInstallmentFloat = 0;

    if (remainingTenor > 0) {
      const rateFloatMonth = (rateFloatYear / 100) / 12;
      monthlyInstallmentFloat = calculatePMT(rateFloatMonth, remainingTenor, balanceAfterFix);

      let tempBalance = balanceAfterFix;
      for (let i = 0; i < remainingTenor; i++) {
        const interestPortion = tempBalance * rateFloatMonth;
        const principalPortion = monthlyInstallmentFloat - interestPortion;
        accumulatedInterestFloat += interestPortion;
        tempBalance -= principalPortion;
      }
    }

    setPokokPinjaman(loanAmount);
    setTotalBungaFix(accumulatedInterestFix);
    setSisaPokok(balanceAfterFix);
    setTotalBungaFloating(accumulatedInterestFloat);

    const maxInstallment = income * 0.3; 
    const currentInstallment = fixPeriod > 0 ? monthlyInstallmentFix : monthlyInstallmentFloat;

    if (currentInstallment <= maxInstallment) {
      setStatus('Cukup');
    } else {
      setStatus('Kurang');
    }

    setShowResult(true);
  };

  return (
    <>
      <NavBar isLoggedIn={true} />
      
      <div className='kpr-container'>
        <div className='kpr-header'>
            <h1>Simulasi KPR</h1>
            <p>Hitung Cicilan KPR sesuai harga rumah, tenor, dan bunga pinjaman</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                
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

export default SimulasiKPR;