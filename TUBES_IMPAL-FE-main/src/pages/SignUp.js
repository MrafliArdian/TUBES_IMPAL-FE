import React, { useState } from 'react';
import './SignUp.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit() {
      if (!nama || !email || !hp || !password) {
        setError("Semua field harus diisi!");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
          setError("Format email tidak valid!");
          return;
      }

      if (password.length < 8) {
        setError("Password harus minimal 8 karakter!");
        return;
      }
      // valid → navigate
      navigate("/");
  }

  return (
    <div className="signUpPage">  
      <div className="signup-wrapper">
        
        {/* IMAGE */}
        <div 
          className="signup-left"
          style={{ backgroundImage: "url('/images/ImageLogin.jpg')" }}
        ></div>

        {/* FORMS */}
        <div className="signup-right">
          <h1 className="title">Buat Akun</h1>
          <p className="subtitle">Kalkulator Investasi</p>
          <form className="signup-form">

            <input 
            type="text" 
            placeholder="Masukkan Nama Lengkap" 
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            />

            <input 
            type="email" 
            placeholder="Masukkan Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <input 
            type="tel" 
            placeholder="Masukkan No.Handphone" 
            value={hp}
            onChange={(e) => {
              const value = e.target.value;

              // Hanya izinkan angka
              if (/^[0-9]*$/.test(value)) {
                  setHp(value);
              }
            }}
            required
            />

            <input 
            type="password" 
            placeholder="Masukkan password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            {error && <p className="error">{error}</p>}
          </form>
          <div className="login-btn">
              <Button 
              className='btns' 
              buttonStyle='btn--green' 
              buttonSize='btn--large'
              onClick={handleSubmit}
              type='button'
              >
              Daftar
              </Button>
          </div>

        </div>
      </div>

      {/* <nav className="navbarBawah"> */}
            
      {/* </nav> */}
    </div>
  );
}
