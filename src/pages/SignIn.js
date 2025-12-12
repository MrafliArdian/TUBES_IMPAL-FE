import React, { useState } from 'react';
import './SignIn.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");
    const [error, setError] = useState("");

    function handleSubmit() {
      if (!nama|| !password) {
        setError("Semua field harus diisi!");
        return;
      }

      if (password.length < 8) {
        setError("Password harus minimal 8 karakter!");
        return;
      }
      // valid → navigate
      navigate("/dashboard");
  }

  return (
    <div className="signInPage">  
      <div className="signIn-wrapper">
        
        {/* IMAGE */}
        <div 
          className="signIn-left"
          style={{ backgroundImage: "url('/images/ImageLogin.jpg')" }}
        ></div>

        {/* FORMS */}
        <div className="signIn-right">
          <h1 className="title-signIn">Masuk ke Akun</h1>
          <p className="subtitle-signIn">Kalkulator Investasi!</p>
          <form className="signIn-form">

            <input 
            type="text" 
            placeholder="Masukkan Username" 
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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
