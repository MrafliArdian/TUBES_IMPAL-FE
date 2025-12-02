import React, { useState } from 'react';
import './SignIn.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit() {
      if (!email|| !password) {
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
          <h1 className="title">Masuk ke Akun</h1>
          <p className="subtitle">Kalkulator Investasi!</p>
          <form className="signIn-form">

            <input 
            type="email" 
            placeholder="Masukkan Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
