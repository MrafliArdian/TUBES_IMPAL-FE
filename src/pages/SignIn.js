import React, { useState } from 'react';
import './SignIn.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
      if (!nama|| !password) {
        setError("Semua field harus diisi!");
        return;
      }

    //   if (password.length < 8) {
    //     setError("Password harus minimal 8 karakter!");
    //     return;
    //   } // Backend will handle this validation

      setIsLoading(true);
      const res = await login(nama, password);
      setIsLoading(false);

      if (res.success) {
        navigate("/dashboard");
      } else {
          // res.error could be object or string
          const msg = typeof res.error === 'string' ? res.error : JSON.stringify(res.error);
          setError(msg);
      }
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
              {isLoading ? 'Loading...' : 'Masuk'}
              </Button>
          </div>

        </div>
      </div>

      {/* <nav className="navbarBawah"> */}
            
      {/* </nav> */}
    </div>
  );
}
