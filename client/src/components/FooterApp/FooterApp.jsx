import React from 'react';
import './footerApp.scss';

export const FooterApp = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='brand-rrss'>
          <img className='footer-logo' src="/logo-gnegro.png" alt="logo" />
          <div className='footer-rrss'>
            <span><a href=""><img src="/was.png" alt="whatsapp" /></a></span>
            <span><a href=""><img src="/insta.png" alt="instagram" /></a></span>
            <span><a href=""><img src="/face.png" alt="facebook" /></a></span>
            <span><a href=""><img src="/pint.png" alt="pinterest" /></a></span>
            <span><a href=""><img src="/yout.png" alt="youtube" /></a></span>

          </div>
        </div>

        <div className='footer-legal'>
          <span>Atención al cliente</span>
          <ul>
            <li>Aviso legal</li>
            <li>Política de privacidad</li>
            <li>Política de cookies</li>
            <li>Términos y condiciones</li>
            <li>Garantía</li>
            <li>Entrega</li>
            <li>Política de devoluciones</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
