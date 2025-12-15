import React, { useState } from "react";
import "./KalkulatorEmas.css";
import NavBar from "../components/NavBar/NavBar";
import { formatNumber, unformatNumber, formatRupiah } from "../Format";
import { Button } from "../components/Button/Button";
import api from '../services/api';

export default function KalkulatorEmas() {
  const [activeTab, setActiveTab] = useState("emasToRp");
  const [useSellPrice, setUseSellPrice] = useState(false);
  const [gramsInput, setGramsInput] = useState('');
  const [rupiahInput, setRupiahInput] = useState('');
  const [resultGrams, setResultGrams] = useState(null);
  const [resultRupiah, setResultRupiah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded prices for simulation since no external API provided
  const buyPrice = 1350000;
  const sellPrice = 1250000;

  const handleHitung = async () => {
      setLoading(true);
      setError('');
      setResultGrams(null);
      setResultRupiah(null);

      try {
          // Determine price to use
          // If emasToRp (Selling gold to get Rp), typically use Sell Price.
          // If rpToEmas (Buying gold with Rp), typically use Buy Price.
          // But user has a toggle 'useSellPrice' in emasToRp tab.
          
          let pricePerGram = buyPrice;
          if (activeTab === 'emasToRp' && useSellPrice) {
              pricePerGram = sellPrice;
          } else if (activeTab === 'emasToRp' && !useSellPrice) {
              // converting value using buy price (assets valuation?)
              pricePerGram = buyPrice; 
          } else if (activeTab === 'rpToEmas') {
              pricePerGram = buyPrice;
          }

          const mode = activeTab === 'emasToRp' ? 'emas_to_rupiah' : 'rupiah_to_emas';
          
          const payload = {
              mode: mode,
              price_per_gram: pricePerGram,
              price_choice: useSellPrice ? 'sell' : 'buy', // Metadata
          };

          if (mode === 'emas_to_rupiah') {
              payload.grams_input = parseFloat(gramsInput);
          } else {
              payload.rupiah_input = parseFloat(rupiahInput);
          }

          const response = await api.post('emas/', payload);
          const data = response.data;

          if (data.result_rupiah) setResultRupiah(data.result_rupiah);
          if (data.result_grams) setResultGrams(data.result_grams);

      } catch (err) {
          console.error(err);
          setError('Gagal menghitung. Periksa input.');
      } finally {
          setLoading(false);
      }
  };

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className="gold-wrapper">
        <h1 className="title">Kalkulator Emas</h1>
        <p className="subtitle">
          Hitung nilai investasi emas anda secara cepat dan akurat
        </p>

        {/* HARGA EMAS CARD */}
        <div className="price-card">
          <h2 className="price-title">Harga Emas Hari Ini</h2>

          <div className="price-content">
            {/* Beli */}
            <div className="price-box">
              <span className="price-label">Beli</span>
              <span className="price-value">{formatRupiah(buyPrice)}</span>
            </div>

            <div className="divider"></div>

            {/* Jual */}
            <div className="price-box">
              <span className="price-label">Jual</span>
              <span className="price-value">{formatRupiah(sellPrice)}</span>
            </div>
          </div>

          <div className="calculator-box">
            {/* Toggle Tabs */}
            <div className="tab-container">
              <button
                className={activeTab === "emasToRp" ? "tab active" : "tab"}
                onClick={() => {
                    setActiveTab("emasToRp");
                    setResultGrams(null);
                    setResultRupiah(null);
                    setError('');
                }}
              >
                Emas → Rupiah
              </button>

              <button
                className={activeTab === "rpToEmas" ? "tab active" : "tab"}
                onClick={() => {
                    setActiveTab("rpToEmas"); 
                    setResultGrams(null);
                    setResultRupiah(null);
                    setError('');
                }}
              >
                Rupiah → Emas
              </button>
            </div>

            <div className="form-content">
                {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                
              {activeTab === "emasToRp" && (
                <>
                  <label className="form-label">Jumlah emas (gram)</label>
                  <input 
                    className="form-input" 
                    type="number" 
                    placeholder="0" 
                    value={gramsInput}
                    onChange={(e) => setGramsInput(e.target.value)}
                  />

                  {/* Toggle switch */}
                  <label className="toggle-row">
                    <input
                      type="checkbox"
                      checked={useSellPrice}
                      onChange={(e) => setUseSellPrice(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Gunakan harga jual (Buyback)</span>
                  </label>

                  <div className="result-display" style={{marginTop: '20px', textAlign: 'center'}}>
                      <label className="form-label">Hasil Konversi (Rp)</label>
                      <h3>{resultRupiah ? formatRupiah(resultRupiah) : 'Rp -'}</h3>
                  </div>
                </>
              )}

              {activeTab === "rpToEmas" && (
                <>
                  <label className="form-label">Rupiah (Rp)</label>
                  <input 
                    className="form-input" 
                    type="number" 
                    placeholder="0" 
                    value={rupiahInput}
                    onChange={(e) => setRupiahInput(e.target.value)}
                  />

                  <div className="result-display" style={{marginTop: '20px', textAlign: 'center'}}>
                      <label className="form-label">Hasil Konversi (Gram)</label>
                      <h3>{resultGrams ? parseFloat(resultGrams).toFixed(4) + ' gram' : '-'}</h3>
                  </div>
                </>
              )}
            </div>

             <div className='button-container' style={{padding: '20px'}}>
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
        </div>
      </div>
    </>
  );
}
