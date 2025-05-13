import React, { useState, ReactProps, useEffect } from 'react'
import { supabase } from "../assets/client"
import '../styles.css';
import check from '../assets/Check.png'

const Configuracao = ({token}) => {
  const [novoLink, setNovoLink] = useState({link_title: "", link_url: ""});
  const [links, setLinks] = useState([]);


  const fetchLinks = async () => {
    const { error, data } = await supabase.from("links").select("*")
    .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading link: ", error.message);
      return;
    }

    setLinks(data);

  };

  const handleSubmit = async (e) => {
    console.log("comando acionado");
    e.preventDefautlt();

    const {error} = await supabase.from("links").insert(novoLink).single()

    if (error) {
      console.error("Error adding link: ", error.message);
    }

    setNovoLink({ link_title: "", link_url: "" });
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  console.log('oi');
  console.log(links);

  return (
    <div className='backgroundConfig'>
      
    <div className='containerPortfolio'>
        <div className='configPortfolioBackground'>
          <img className='configPortfolioBanner'></img> 
        </div>
        
        <h1 className='configPortfolioNome'>{token.user.user_metadata.fullName}</h1>
        <p className='configPortfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis.</p>

        {/* Configurar links do portfolio */}

        <form className='containerConfigLink'>

            <div className='configLinkComponent'>
                
                <input className='configLinkText' placeholder='Texto' type='text' name='linkTitle'
                onChange={(e) => setNovoLink((prev) => ({...prev, link_title: e.target.value }))}
                />

                <input className='configLinkText' placeholder='Link' type='text' name='linkUrl'
                onChange={(e) => setNovoLink((prev) => ({...prev, link_url: e.target.value }))}
                />

            </div>
          
            <div className='containerConfigLinkBtn'>

              <button className='configAdicionarLink'>
                <img src={check} alt="" onClick={handleSubmit}/>
              </button>

            </div>
        </form>

          {/* Configurar perfil de usuário/empresa */}

        <div className='containerConfigLink'>
            <div className='configLinkComponent'>
                <input className='configLinkText' placeholder='Nome ou Empresa' type='text' name='linkTitle'/>
            </div>
            
            <form className='configLinkComponent'>
                <input className='configProfileBio' placeholder='Biografia' type='text' name='linkTitle'/>
            </form>

            <div className='containerConfigLinkBtn'>
            <button className='configAdicionarLink'>
              <img src={check} alt="" />
            </button>

            </div>
        </div>
     
    </div>
    </div>
  )
}

export default Configuracao