import React from 'react'
import '../styles.css'

function Portfolio() {
  return (
    <div className='backgroundLogin'>
      
    <div className='containerPortfolio'>
        <image className='portfolioBanner'></image>
        <h1 className='portfolioNome'>Nome</h1>
        <p className='portfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis.</p>

        <div>
            <div className='linkComponent'>
                <image className='linkIcone'></image>
                <text className='linkButton'>Link1</text>
            </div>
            <div className='linkComponent'>
                <image className='linkIcone'></image>
                <text className='linkButton'>Link2</text>
            </div>
        </div>
     
    </div>
    </div>
  )
}

export default Portfolio