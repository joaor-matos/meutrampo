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
        
        <h1 className='configPortfolioNome'>{token.user.user_metadata.fullName}</h1>
        <p className='configPortfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis.</p>

        <div className='containerConfigLink'>
            <div className='configLinkComponent'>
            <label className='configLinkIcone'>
                  <input type='file' accept='image/png, image/jpeg'/>
                </label>
                <input className='configLinkText' placeholder='Texto' type='text' name='linkTitle'/>
                <input className='configLinkText' placeholder='Link' type='text' name='linkTitle'/>
            </div>
            <form className='configLinkComponent'>
                <label className='configLinkIcone'>
                  <input type='file' accept='image/png, image/jpeg'/>
                </label>
                <input className='configLinkText' placeholder='Texto' type='text' name='linkTitle'/>
                <input className='configLinkText' placeholder='Link' type='text' name='linkTitle'/>
            </form>
            <div className='containerConfigLinkBtn'>
            <button className='configAdicionarLink'>
              <img src={plus} alt="" />
            </button>
            <button className='configAdicionarLink'>
              <img src={plus} alt="" />
            </button>
            </div>
        </div>
     
    </div>
    </div>
  )
}

export default Configuracao