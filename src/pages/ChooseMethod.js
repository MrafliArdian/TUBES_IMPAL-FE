import React, { useState } from 'react';
import './ChooseMethod.css';
import { Button } from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function Method() {
    const navigate = useNavigate();
  return (
    <div className="methodPage">  
      <div className="method-wrapper">
        
        <div 
          className="method-left"
          style={{ backgroundImage: "url('/images/ImageLogin.jpg')" }}
        ></div>

        <div class="method-right">
            <h1 class="title">MASUK ke akun</h1>
            <p class="subtitle">Kalkulator Investasi!</p>

            <div class="email-btn">
                <Button 
                    className='btns' 
                    buttonStyle='btn--green' 
                    buttonSize='btn--large'
                    onClick={() => navigate('/sign-in')}
                    type='button'
                    >
                        Gunakan Email atau No.Handphone
                </Button>
            </div>
            <div class="daftar-btn">
                <Button 
                    className='btns' 
                    buttonStyle='btn--green' 
                    buttonSize='btn--large'
                    onClick={() => navigate('/sign-up')}
                    type='button'
                    >
                        tidak punya akun? daftar sekarang
                </Button>
            </div>
        </div>

      
      </div>
    </div>
  );
}
