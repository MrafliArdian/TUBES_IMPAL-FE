import React, { useState } from 'react';
import './SignUp.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
      setError('');
      if (!nama || !email || !hp || !password || !confirmPassword) {
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

      if (confirmPassword !== password){
        setError("Password tidak sesuai!")
        return
      }

      setLoading(true);
      try {
        // Calling register with: username, email, password, confirmPassword, phone_number, full_name
        // We use 'nama' for both username and full_name
        const result = await register(nama, email, password, confirmPassword, hp, nama); 
        
        if (result.success) {
            alert('Registrasi berhasil! Silakan login.');
            navigate("/sign-in");
        } else {
             // Handle object or string error
             const msg = result.error 
                ? (typeof result.error === 'object' ? JSON.stringify(result.error) : result.error)
                : "Gagal mendaftar.";
             setError(msg);
        }
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan sistem. Cek konsol.");
      } finally {
        setLoading(false);
      }
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
          <p className="subtitle">Kalkulator Investasi!</p>
          <form className="signup-form">

            <input 
            type="text" 
            placeholder="Masukkan Username" 
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

            <input 
            type="password" 
            placeholder="Konfirmasi password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

            {error && <p className="error" style={{color: 'red', fontSize: '14px', marginTop: '10px'}}>{error}</p>}
          </form>
          <div className="signIn-btn">
              <Button 
              className='btns' 
              buttonStyle='btn--green' 
              buttonSize='btn--large'
              onClick={handleSubmit}
              type='button'
              disabled={loading}
              >
              {loading ? 'Mendaftar...' : 'Daftar'}
              </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
