import React from 'react'
import '../styles.css';
import plus from '../assets/Icon.png'

const Configuracao = ({token}) => {
  return (
    <div className='backgroundConfig'>
      
    <div className='containerPortfolio'>
        <div className='configPortfolioBackground'>
          <image className='configPortfolioBanner'></image> 
        </div>
        
        <h1 className='configPortfolioNome'>Nome</h1>
        <p className='configPortfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis.</p>

        <div className='containerConfigLink'>
            <div className='configLinkComponent'>
                <image className='configLinkIcone'></image>
                <text className='configLinkText'>Texto</text>
                <text className='configLinkText'>Link</text>
            </div>
            <button className='configAdicionarLink'>
              <text>+</text>
            </button>
        </div>
     
    </div>
    </div>
  )
}

export default Configuracao