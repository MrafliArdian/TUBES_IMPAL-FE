import React from 'react'
import { Button } from './Button'
import './HeroSection.css'
import '../App.css'

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/ImageStart.jpg' alt='background' className='bg-image' />
      {/* <video src='/videos/video-2.mp4' autoPlay loop muted /> */}
      <h1>SELAMAT DATANG DI KALKULATOR INVESTASI</h1>
      <p>Proyeksi investasi yang andal — sederhana dan akurat</p>
      <div className='hero-btns'>
        <Button to='/' className='btns' buttonStyle='btn--green' buttonSize='btn--large'>
            MASUK
        </Button>
        <Button to='/sign-up' className='btns' buttonStyle='btn--green' buttonSize='btn--large'>
            DAFTAR
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
