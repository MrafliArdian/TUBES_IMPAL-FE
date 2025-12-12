import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './Pendidikan.css';
import { Button } from '../components/Button/Button';

function Pendidikan() {
  const [usiaAnakSekarang, setUsiaAnakSekarang] = useState('');
  const [usiaMasukKuliah, setUsiaMasukKuliah] = useState('');
  const [biayaPerTahun, setBiayaPerTahun] = useState('');
  const [lamaKuliah, setLamaKuliah] = useState('');
  const [inflasi, setInflasi] = useState('');
  const [returnInvestasi, setReturnInvestasi] = useState('');

  const [totalBiayaMasaDepan, setTotalBiayaMasaDepan] = useState(0);
  const [danaPerBulan, setDanaPerBulan] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleHitung = () => {
    const currentAge = parseFloat(usiaAnakSekarang) || 0;
    const collegeAge = parseFloat(usiaMasukKuliah) || 0;
    const currentCostPerYear = parseFloat(biayaPerTahun) || 0;
    const duration = parseFloat(lamaKuliah) || 0;
    const inflationRate = parseFloat(inflasi) || 0;
    const investmentReturn = parseFloat(returnInvestasi) || 0;

    const yearsToCollege = collegeAge - currentAge;
    
    if (yearsToCollege <= 0) {
      alert("Usia masuk kuliah harus lebih besar dari usia sekarang");
      return;
    }

    const totalCurrentCost = currentCostPerYear * duration;

    const futureCost = totalCurrentCost * Math.pow((1 + (inflationRate / 100)), yearsToCollege);

    let monthlySavings = 0;
    const totalMonths = yearsToCollege * 12;
    const monthlyReturn = (investmentReturn / 100) / 12;

    if (investmentReturn === 0) {
      monthlySavings = futureCost / totalMonths;
    } else {
      monthlySavings = futureCost * (monthlyReturn / (Math.pow(1 + monthlyReturn, totalMonths) - 1));
    }

    setTotalBiayaMasaDepan(futureCost);
    setDanaPerBulan(monthlySavings);
    setShowResult(true);
  };

  return (
    <>
      <NavBar isLoggedIn={true} />
      
      <div className='pendidikan-container'>
        <div className='pendidikan-header'>
            <h1>Pendidikan Anak</h1>
            <p>Hitung kebutuhan dana pendidikan anak anda di masa depan</p>
        </div>

        <div className='calculator-grid'>
            <div className='input-section'>
                
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

                <h3 className='section-title'>Asumsi Keuangan</h3>
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
                    <p className='label-result'>Total biaya kuliah di masa depan</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(totalBiayaMasaDepan) : 'Rp -'}
                    </h3>
                </div>

                <div className='result-item'>
                    <p className='label-result'>Dana yang harus dipersiapkan (Per Bulan)</p>
                    <h3 className='large-result'>
                        {showResult ? formatRupiah(danaPerBulan) : 'Rp -'}
                    </h3>
                </div>
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

export default Pendidikan;