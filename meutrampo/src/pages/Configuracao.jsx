import React, { useState, useEffect } from 'react'
import { supabase } from "../assets/client"
import '../styles.css';
import check from '../assets/Check.png';
import deleteIcon from '../assets/delete.png';

const Configuracao = ({ token }) => {
  const [links, setLinks] = useState([]);

  const [novoLinkTitle, setNovoLinkTitle] = useState("");
  const [novoLinkURL, setNovoLinkURL] = useState("");


  const fetchLinks = async () => {
    const { error, data } = await supabase.from("links")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading link: ", error.message);
      return;
    }

    setLinks(data || []);

  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = async () => {
    if (!novoLinkTitle || !novoLinkURL) return;

    const novoLinkData = {
      link_title: novoLinkTitle,
      link_url: novoLinkURL,
    };
    const { error } = await supabase
      .from("links")
      .insert([novoLinkData]);

    if (error) {
      console.error("Erro adicionando link ", error);
    } else {
      await fetchLinks();
      setNovoLinkTitle("");
      setNovoLinkURL("");
    }
  };

  const handleDeleteLink = async (id_link) => {
    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id_link", id_link);

    if (error) {
      console.error("Error deletando link ", error);
    } else {
      setLinks((prev) => prev.filter((item) => item.id_link !== id_link));
    }
  };

  return (
    <div className='backgroundConfig'>

      <div className='containerPortfolio'>
        

        <h1 className='configPortfolioNome'>{token?.user?.user_metadata?.fullName}</h1>
        <p className='configPortfolioBio'>{token?.user?.user_metadata?.fullName}</p>

        {/* Configurar links do portfolio */}

        <div className='containerConfigLink'>

          <div className='configLinkComponent'>
            <input 
              className='configLinkText' 
              placeholder='Texto' 
              type='text' 
              name='linkTitle'
              value={novoLinkTitle}
              onChange={(e) => setNovoLinkTitle(e.target.value)}
            />
            <input 
              className='configLinkText' 
              placeholder='Link' 
              type='text' 
              name='linkUrl'
              value={novoLinkURL}
              onChange={(e) => setNovoLinkURL(e.target.value)}
            />
          </div>

          <div className='containerConfigLinkBtn'>
            <button className='configAdicionarLink' onClick={handleAddLink}>
              <img src={check} alt="Adicionar link" />
            </button>
          </div>
        </div>

        {/* Seção de links no banco de dados do usuário */}
        <div>
          <ul>
            {links.map((link) => (
              <li key={link.id_link}>
                <div className='linkComponent'>
                  <span className='linkButton'>{link.link_title}</span>
                  
                  {/* Botão de deletar links */}
                  <button className='containerDeleteLinkBtn' onClick={() => handleDeleteLink(link.id_link)}>
                    <img className='configDeletarLink' src={deleteIcon} alt="Deletar link" />
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Configurar perfil de usuário/empresa */}

        <div className='containerConfigLink'>
          <div className='configLinkComponent'>
            <input className='configLinkText' placeholder='Nome ou Empresa' type='text' name='linkTitle' />
          </div>

          <form className='configLinkComponent'>
            <input className='configProfileBio' placeholder='Biografia' type='text' name='linkTitle' />
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