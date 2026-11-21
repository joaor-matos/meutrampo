import React, { useState, useEffect } from 'react'
import { supabase } from "../assets/client"
import '../styles.css';
import check from '../assets/Check.png';
import copy from '../assets/copy.svg';
import newwindow from '../assets/newwindow.svg';
import logout from '../assets/logout.svg';
import deleteIcon from '../assets/delete.png';
import logo from '../assets/logo.png';
import arrow from '../assets/arrowOrdem.svg';
import trashcan from '../assets/trashcan.svg';
import plus from '../assets/Plus.svg';

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

      {/* Header do painel de configuração do portfolio */}

      <div className='headerConfig'>
        <div className='headerConfigLeft'>

          <div className='containerConfigLeftLogo'>
            <img src={logo} alt="Logo Meu Trampo" />

            <div className='containerConfigLeftText'>
              <h2>meu trampo</h2>
              <h3>PAINEL DO CRIADOR</h3>
            </div>
          </div>
          <div className='containerConfigLeftUrl'>
            <p>meutrampo.com/</p>
            <span>{token?.user?.user_metadata?.fullName}</span>
            <div></div>
            <button onclick="navigator.clipboard.writeText('https://meutrampo.bio/maricosta'); alert('Link copiado para a área de transferência!');">
              <img src={copy} alt="Copiar link do seu portfolio" />
              <span>Copiar</span>
            </button>
          </div>
        </div>

        <div className='headerConfigRight'>
          <button className='btnViewLog'>
            <span>Visualizar portfolio</span>
            <img src={newwindow} alt="Visualizar portfolio" />
          </button>
          <button className='btnViewLog' onClick={() => supabase.auth.signOut()}>
            <span>Encerrar sessão</span>
            <img src={logout} alt="Encerrar sessão" />
          </button>
        </div>

      </div>

      <div className='containerPortfolio'>

        {/* Configurar links do portfolio */}

        <div className='containerConfigBlocoLink'>
          <div className='containerConfigBlocoLinkTituloOrdem'>
            <div className='containerConfigBlocoTitulo'>
              <h3>BLOCO: LINKS</h3>
            </div>

            <div className='containerConfigBlocoOrdem'>
              <div>
                <button className='configBtnOrdem'>
                  <img src={arrow} alt="Mover bloco para cima" />
                </button>
                <button className='configBtnOrdem'>
                  <img src={arrow} alt="Mover bloco para baixo" className='arrowImgDown' />
                </button>
              </div>

              <button className='configBtnOrdem'>
                <img src={trashcan} alt="Deletar bloco" className='configDeletarBloco' />
              </button>
            </div>
          </div>



          <div className='configLinkComponent'>
            <button className='configLinkIcon' onClick={handleAddLink}>
              <img src={plus} alt="Adicionar link" />
            </button>
            <div>
              <h7>TÍTULO DO BOTÃO</h7>
              <input
                className='configLinkText'
                placeholder='Texto'
                type='text'
                name='linkTitle'
                value={novoLinkTitle}
                onChange={(e) => setNovoLinkTitle(e.target.value)}
              />
            </div>
            <div>
              <h7>ENDEREÇO URL</h7>
              <input
                className='configLinkText'
                placeholder='Link'
                type='text'
                name='linkUrl'
                value={novoLinkURL}
                onChange={(e) => setNovoLinkURL(e.target.value)}
              />
            </div>
            <button className='configAdicionarLinkBtn' onClick={handleAddLink}>
              <img src={plus} alt="Adicionar link" />
            </button>
          </div>
          <div className='horizontalDivider'></div>
          <div>


            {/* Seção de links no banco de dados do usuário */}
            <div className='containerLinkDisplay'>
              <ul>
                {links.map((link) => (
                  <li key={link.id_link}>
                    <div className='containerLinkDisplay'>
                      <button className='configLinkIcon' onClick={handleAddLink}>
                        <img src={plus} alt="Adicionar link" />
                      </button>
                      <span className='configLinkText'>{link.link_title}</span>
                      <span className='configLinkText'>{link.link_url}</span>
                      {/* Botão de deletar links */}
                      <button className='configAdicionarLinkBtn' onClick={() => handleDeleteLink(link.id_link)}>
                        <img className='configDeletarLink' src={deleteIcon} alt="Deletar link" />
                      </button>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configuracao