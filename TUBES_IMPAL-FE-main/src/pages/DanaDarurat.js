import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation & useNavigate
import './DanaDarurat.css';

function DanaDarurat() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pengeluaran, setPengeluaran] = useState('');
  const [targetBulan, setTargetBulan] = useState('');
  const [danaSaatIni, setDanaSaatIni] = useState('');
  const [investasiBulanan, setInvestasiBulanan] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');

  const [targetDana, setTargetDana] = useState(0);
  const [hasilInvestasi, setHasilInvestasi] = useState(0);
  const [status, setStatus] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  const [isHistoryMode, setIsHistoryMode] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const calculateLogic = (vals) => {
    const expense = parseFloat(vals.pengeluaran) || 0;
    const monthsDuration = parseFloat(vals.targetBulan) || 0;
    const currentSavings = parseFloat(vals.danaSaatIni) || 0;
    const monthlyAdd = parseFloat(vals.investasiBulanan) || 0;
    const rateYear = parseFloat(vals.returnInvestasi) || 0;

    const safetyNetMultiplier = 6; 
    const requiredFund = expense * safetyNetMultiplier;
    const rateMonth = (rateYear / 100) / 12;
    let futureValue = 0;

    if (rateYear === 0) {
      futureValue = currentSavings + (monthlyAdd * monthsDuration);
    } else {
      futureValue = 
        currentSavings * Math.pow(1 + rateMonth, monthsDuration) + 
        (monthlyAdd * ((Math.pow(1 + rateMonth, monthsDuration) - 1) / rateMonth));
    }

    setTargetDana(requiredFund);
    setHasilInvestasi(futureValue);
    if (futureValue >= requiredFund) {
      setStatus('Cukup');
    } else {
      setStatus('Kurang');
    }
    setShowResult(true);
  };

  useEffect(() => {
    if (location.state && location.state.isHistory) {
      setIsHistoryMode(true);
      const data = location.state.historyData;
      
      setPengeluaran(data.pengeluaran);
      setTargetBulan(data.targetBulan);
      setDanaSaatIni(data.danaSaatIni);
      setInvestasiBulanan(data.investasiBulanan);
      setReturnInvestasi(data.returnInvestasi);

      calculateLogic(data);
    }
  }, [location]);

  const handleHitung = () => {
    if (isHistoryMode) {
      setIsHistoryMode(false);
      setShowResult(false);
      setPengeluaran('');
      setTargetBulan('');
      setDanaSaatIni('');
      setInvestasiBulanan('');
      setReturnInvestasi('');
      navigate('/dana-darurat', { replace: true, state: {} });
    } else {
      calculateLogic({
        pengeluaran, targetBulan, danaSaatIni, investasiBulanan, returnInvestasi
      });
    }
  };

  return (
    <>
      <NavBar isLoggedIn={true} />
      
      <div className='dana-container'>
        <div className='dana-header'>
            <h1>{isHistoryMode ? 'History Dana Darurat' : 'Dana Darurat'}</h1>
            <p className='subtitle'>
              {isHistoryMode 
                ? 'Hasil perhitungan yang sudah dihitung pada Dana Darurat' 
                : 'Hanya digunakan saat darurat, bukan untuk kebutuhan sehari-hari atau konsumsi'}
            </p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                
                <div className='form-group'>
                    <label>Pengeluaran Wajib Bulanan</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={pengeluaran} 
                        onChange={(e) => setPengeluaran(e.target.value)}
                        disabled={isHistoryMode} 
                    />
                </div>

                <div className='form-group'>
                    <label>Berapa bulan untuk mengumpulkan dana darurat</label>
                    <input 
                        type="number" 
                        value={targetBulan} 
                        onChange={(e) => setTargetBulan(e.target.value)} 
                        disabled={isHistoryMode}
                    />
                </div>

                <div className='form-group'>
                    <label>Jumlah dana darurat yang dimiliki saat ini</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={danaSaatIni} 
                        onChange={(e) => setDanaSaatIni(e.target.value)} 
                        disabled={isHistoryMode}
                    />
                </div>

                <div className='form-group'>
                    <label>Target investasi bulanan</label>
                    <input 
                        type="number" 
                        placeholder="Rp."
                        value={investasiBulanan} 
                        onChange={(e) => setInvestasiBulanan(e.target.value)} 
                        disabled={isHistoryMode}
                    />
                </div>

                <div className='form-group'>
                    <label>Kamu akan investasi di produk yang returnnya</label>
                    <div className="input-suffix-wrapper">
                        <input 
                            type="number" 
                            value={returnInvestasi} 
                            onChange={(e) => setReturnInvestasi(e.target.value)} 
                            disabled={isHistoryMode}
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
                    <div className={`status-pill ${status === 'Cukup' ? 'success' : 'danger'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>

        <div className='button-container'>
            <button className='btn-hitung' onClick={handleHitung}>
                {isHistoryMode ? 'Hitung Dana Darurat' : 'Hitung Dana Darurat'}
            </button>
        </div>

      </div>
    </>
  )
}

export default DanaDarurat;