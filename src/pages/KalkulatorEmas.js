import React, { useState } from "react";
import "./KalkulatorEmas.css";
import NavBar from "../components/NavBar/NavBar";

export default function KalkulatorEmas() {
  const [activeTab, setActiveTab] = useState("emasToRp");
  const [useSellPrice, setUseSellPrice] = useState(false);

  const buyPrice = "-";
  const sellPrice = "-";

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
          <h2 className="price-title">Harga Emas</h2>

          <div className="price-content">
            {/* Beli */}
            <div className="price-box">
              <span className="price-label">Beli</span>
              <span className="price-value">RP {buyPrice}</span>
            </div>

            <div className="divider"></div>

            {/* Jual */}
            <div className="price-box">
              <span className="price-label">Jual</span>
              <span className="price-value">RP {sellPrice}</span>
            </div>
          </div>

          {/* Calculator Box */}
          <div className="calculator-box">
            {/* Toggle Tabs */}
            <div className="tab-container">
              <button
                className={activeTab === "emasToRp" ? "tab active" : "tab"}
                onClick={() => setActiveTab("emasToRp")}
              >
                Emas → Rupiah
              </button>

              <button
                className={activeTab === "rpToEmas" ? "tab active" : "tab"}
                onClick={() => setActiveTab("rpToEmas")}
              >
                Rupiah → Emas
              </button>
            </div>

            <div className="form-content">
              {activeTab === "emasToRp" && (
                <>
                  <label className="form-label">Jumlah emas (gram)</label>
                  <input className="form-input" type="number" placeholder="0" />

                  {/* Toggle switch */}
                  <label className="toggle-row">
                    <input
                      type="checkbox"
                      checked={useSellPrice}
                      onChange={(e) => setUseSellPrice(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Gunakan harga jual</span>
                  </label>

                  <label className="form-label">Rupiah (Rp)</label>
                  <input className="form-input" type="text" placeholder="0" />
                </>
              )}

              {activeTab === "rpToEmas" && (
                <>
                  <label className="form-label">Rupiah (Rp)</label>
                  <input className="form-input" type="number" placeholder="0" />

                  <label className="form-label">Jumlah emas (gram)</label>
                  <input className="form-input" type="text" placeholder="0" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
