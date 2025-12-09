import React from 'react'
import logo from '../assets/logo.png';
import logofooter from '../assets/logofooter.png';
import footerlinks from '../assets/footerlinks.png';

function LandingPage() {
  return (
    <body>
            <div>LandingPage</div>
    <header>

    </header>
    <div>
        
    </div>
    <footer className='footerLP'>
    <div>
      <img src={logofooter} alt="" />
      <img src={footerlinks} alt="" className=''/>

    </div>
    {/* <ul>
      <li><a href="" className='redlinkfooterLP'>Sobre o produto</a></li>
      <li><a href="" className='redlinkfooterLP'>Nossos clientes</a></li>
      <li><a href="" className='redlinkfooterLP'>Crie seu perfil</a></li>
      <li><a href="" className='redlinkfooterLP'>Sobre nós</a></li>
    </ul> */}
    </footer>
    </body>

  )
}

export default LandingPage