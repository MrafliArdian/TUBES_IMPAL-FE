import React from 'react'
import { Button } from './Button'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-container'>
      <section class="footer-subscription">
        <p class="footer-subscription-heading">
            JOIN THE ADVENTURE LOL IDK WHAT TO PUT HERE I DONT WANNA FOLLOW THE TUTORIAL
        </p>
        <p class="footer-subscription-text">
            FUCK YOU
        </p>
        <div class="input-areas">
            <form >
                <input type="email" name='email' placeholder='Your Email' class="footer-input"/>
                <Button buttonStyle='btn--outline'>
                Subscribe
                </Button>
            </form>
        </div>
      </section>
      <div class="footer-links">
        <div class="footer-link-wrapper">
            <div class="footer-link items">
                <h2>about us</h2>
                <Link to='/sign-up'>How it works</Link>
                <Link to='/' >Testimonial</Link>
                <Link to='/' >Careers</Link>
                <Link to='/' >Investors</Link>
                <Link to='/' >Terms of Service</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
