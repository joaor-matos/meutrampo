import React, { useState, useEffect } from 'react'
import { supabase } from "../assets/client"
import '../styles.css';
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
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");

  const maxBio = 160;

  // Galeria
  const [galeriaImagens, setGaleriaImagens] = useState([
    { id: 1, legenda: 'Legenda' },
  ]);
  const [modoExibicao, setModoExibicao] = useState('carrossel');

  // Vídeo
  const [videoUrl, setVideoUrl] = useState('https://youtube.com/watch?v=dQw4w9WgXcQ');
  const [videoConfirmado, setVideoConfirmado] = useState(false);

  useEffect(() => {
    if (token?.user?.user_metadata?.fullName) {
      setFullName(token.user.user_metadata.fullName);
    }
    if (token?.user?.user_metadata?.biografia) {
      setBio(token.user.user_metadata.biografia);
    }
  }, [token]);

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
    const { error } = await supabase.from("links").insert([novoLinkData]);
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

  const copiarLink = () => {
    const url = `https://meutrampo.bio/${fullName}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  // Galeria
  const handleAddImagem = () => {
    setGaleriaImagens([
      ...galeriaImagens,
      { id: Date.now(), legenda: `Legenda ${galeriaImagens.length + 1}` }
    ]);
  };

  const handleRemoveImagem = (id) => {
    setGaleriaImagens(galeriaImagens.filter(img => img.id !== id));
  };

  // Vídeo
  const handleConfirmarVideo = () => {
    if (!videoUrl.trim()) return;
    setVideoConfirmado(true);
  };

  const handleLimparVideo = () => {
    setVideoUrl('');
    setVideoConfirmado(false);
  };

  return (
    <div className="backgroundConfig">

      {/* ===== HEADER ===== */}
      <header className="headerConfig">
        <div className="headerConfigLeft">
          <div className="containerConfigLeftLogo">
            <img src={logo} alt="Logo Meu Trampo" />
            <div className="containerConfigLeftText">
              <h2>meu trampo</h2>
              <h3>PAINEL DO CRIADOR</h3>
            </div>
          </div>
          <div className="containerConfigLeftUrl">
            <p>meutrampo.com/</p>
            <span>{fullName}</span>
            <button onClick={copiarLink} type="button">
              <img src={copy} alt="Copiar link do seu portfolio" />
              <span>Copiar</span>
            </button>
          </div>
        </div>

        <div className="headerConfigRight">
          <button className="btnViewLog" type="button">
            <span>Visualizar portfolio</span>
            <img src={newwindow} alt="Visualizar portfolio" />
          </button>
          <button className="btnViewLog" onClick={() => supabase.auth.signOut()} type="button">
            <span>Encerrar sessão</span>
            <img src={logout} alt="Encerrar sessão" />
          </button>
        </div>
      </header>

      {/* ===== MAIN: grid com editor + preview ===== */}
      <main className="configMain">
        <div className="configGrid">

          {/* ========== COLUNA ESQUERDA: EDITOR ========== */}
          <section className="configEditor">

            {/* ----- Card: Edições Gerais ----- */}
            <article className="configCard">
              <div className="configCardHeader">
                <span className="configDot"></span>
                <h2>Edições Gerais do Perfil</h2>
              </div>

              <div className="configCardBody">
                {/* Avatar */}
                <div className="configAvatarRow">
                  <div className="configAvatar">
                    <div className="configAvatarInner">
                      {fullName ? fullName.substring(0, 2).toUpperCase() : 'MC'}
                    </div>

                  </div>
                  <div className="configAvatarInfo">
                    <h3>Foto de Apresentação</h3>
                    <p>Recomendado formato quadrado (PNG, JPG ou WEBP) até 5MB.</p>
                    <div className="configAvatarBtns">
                      <button type="button" className="btnPrimarySm">Trocar imagem</button>
                      <button type="button" className="btnSecondarySm">Remover</button>
                    </div>
                  </div>
                </div>

                {/* Nome */}
                <div className="configField">
                  <label htmlFor="name-input">Nome ou Empresa</label>
                  <input
                    id="name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Mariana Costa ou Studio Criativo"
                  />
                </div>

                {/* Bio */}
                <div className="configField">
                  <div className="configFieldLabelRow">
                    <label htmlFor="bio-input">Biografia Resumida</label>
                    <span className={`configBioCounter ${bio.length > maxBio ? 'over' : ''}`}>
                      {bio.length} / {maxBio} caracteres
                    </span>
                  </div>
                  <textarea
                    id="bio-input"
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Descreva brevemente quem é você, seus serviços principais ou seu foco artístico..."
                  />
                </div>
              </div>
            </article>

            {/* ----- Toolbar de adição rápida (visual) ----- */}
            <div className="configQuickAdd">
              <div className="configQuickAddHeader">
                <span>Adicionar novo bloco ao portfólio</span>
              </div>
              <div className="configQuickAddButtons">
                <button type="button" className="configQuickAddBtn">
                  <span className="configPlusCircle">+</span>
                  <span>Link / Botão</span>
                </button>
                <button type="button" className="configQuickAddBtn">
                  <span className="configPlusCircle">+</span>
                  <span>Galeria</span>
                </button>
                <button type="button" className="configQuickAddBtn">
                  <span className="configPlusCircle">+</span>
                  <span>Vídeo</span>
                </button>
              </div>
            </div>

            {/* ----- Bloco: Links (original mantido) ----- */}
            <div className="containerConfigBlocoLink">
              <div className="containerConfigBlocoLinkTituloOrdem">
                <div className="containerConfigBlocoTitulo">
                  <h3>BLOCO: LINKS</h3>
                </div>
                <div className="containerConfigBlocoOrdem">
                  <div>
                    <button className="configBtnOrdem" type="button">
                      <img src={arrow} alt="Mover bloco para cima" />
                    </button>
                    <button className="configBtnOrdem" type="button">
                      <img src={arrow} alt="Mover bloco para baixo" className="arrowImgDown" />
                    </button>
                  </div>
                  <button className="configBtnOrdem" type="button">
                    <img src={trashcan} alt="Deletar bloco" className="configDeletarBloco" />
                  </button>
                </div>
              </div>

              <div className="configLinkComponent">
                <button className="configLinkIcon" onClick={handleAddLink} type="button">
                  <img src={plus} alt="Adicionar link" />
                </button>
                <div>
                  <h7>TÍTULO DO BOTÃO</h7>
                  <input
                    className="configLinkText"
                    placeholder="Texto"
                    type="text"
                    name="linkTitle"
                    value={novoLinkTitle}
                    onChange={(e) => setNovoLinkTitle(e.target.value)}
                  />
                </div>
                <div>
                  <h7>ENDEREÇO URL</h7>
                  <input
                    className="configLinkText"
                    placeholder="Link"
                    type="text"
                    name="linkUrl"
                    value={novoLinkURL}
                    onChange={(e) => setNovoLinkURL(e.target.value)}
                  />
                </div>
                <button className="configAdicionarLinkBtn" onClick={handleAddLink} type="button">
                  <img src={plus} alt="Adicionar link" />
                </button>
              </div>

              <div className="horizontalDivider"></div>

              <div className="containerLinkDisplay">
                <ul>
                  {links.map((link) => (
                    <li key={link.id_link}>
                      <div className="containerLinkDisplay">
                        <button className="configLinkIcon" type="button">
                          <img src={plus} alt="" />
                        </button>
                        <span className="configLinkText">{link.link_title}</span>
                        <span className="configLinkText">{link.link_url}</span>
                        <button className="configAdicionarLinkBtn" onClick={() => handleDeleteLink(link.id_link)} type="button">
                          <img className="configDeletarLink" src={deleteIcon} alt="Deletar link" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ===== BLOCO: GALERIA VISUAL ===== */}
<div className="configBlockCard">
  <div className="configBlockHeader">
    <div className="configBlockHeaderLeft">
      <span className="configDragHandle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="configBlockTag">Bloco: Galeria Visual</span>
    </div>
    <div className="configBlockActions">
      <button className="configBlockBtn" title="Subir" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="configBlockBtn" title="Descer" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="configBlockBtn configBlockBtnDanger" title="Excluir bloco" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>

  <div className="configBlockBody">
    <div className="configGaleriaGrid">
      <button className="configGaleriaAdd" onClick={handleAddImagem} type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Adicionar</span>
      </button>

      {galeriaImagens.map((img) => (
        <div key={img.id} className="configGaleriaItem">
          <div className="configGaleriaOverlay">
            <button
              className="configGaleriaRemove"
              onClick={() => handleRemoveImagem(img.id)}
              title="Remover imagem"
              type="button"
            >
              ✕
            </button>
          </div>
          <span className="configGaleriaLabel">{img.legenda}</span>
        </div>
      ))}
    </div>
  </div>
</div>

{/* ===== BLOCO: VÍDEO ===== */}
<div className="configBlockCard">
  <div className="configBlockHeader">
    <div className="configBlockHeaderLeft">
      <span className="configDragHandle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="configBlockTag">Bloco: Vídeo</span>
    </div>
    <div className="configBlockActions">
      <button className="configBlockBtn" title="Subir" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="configBlockBtn" title="Descer" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="configBlockBtn configBlockBtnDanger" title="Excluir bloco" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>

  <div className="configBlockBody">
    <div className="configVideoGrid">
      <div className={`configVideoPreview ${videoConfirmado ? 'confirmado' : ''}`}>
        <div className="configVideoPlay">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="configVideoFields">
        <label className="configVideoLabel">Link do YouTube</label>
        <div className="configVideoInputRow">
          <input
            className="configVideoInput"
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            className="configVideoBtnConfirm"
            onClick={handleConfirmarVideo}
            title="Confirmar URL"
            type="button"
          >
            ✓
          </button>
          <button
            className="configVideoBtnClear"
            onClick={handleLimparVideo}
            title="Limpar"
            type="button"
          >
            ✕
          </button>
        </div>
        <p className="configVideoHint">
          O player interativo será renderizado automaticamente no seu link oficial.
        </p>
      </div>
    </div>
  </div>
</div>

          </section>

          {/* ========== COLUNA DIREITA: PREVIEW ========== */}
          <aside className="configPreview">
            <div className="configPreviewHeader">
              <span>Pré-visualização</span>
            </div>

            <div className="phoneFrame">
              <div className="phoneScreen">
                {/* Banner */}
                <div className="phoneBanner"></div>

                {/* Avatar + Nome */}
                <div className="phoneProfile">
                  <div className="phoneAvatar">
                    {fullName ? fullName.substring(0, 2).toUpperCase() : 'MC'}
                  </div>
                  <h3>{fullName || 'Seu nome'}</h3>
                  <p>{bio || 'Sua biografia aparecerá aqui.'}</p>
                </div>

                {/* Links */}
                <div className="phoneLinks">
                  {links.length === 0 && (
                    <div className="phoneLinkPlaceholder">Seus links aparecerão aqui</div>
                  )}
                  {links.map((link) => (
                    <a
                      key={link.id_link}
                      href={/^https?:\/\//i.test(link.link_url) ? link.link_url : `https://${link.link_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="phoneLink"
                    >
                      <span>{link.link_title}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="configFooter">
        <p>© 2025 meu trampo — Feito com paixão para impulsionar talentos independentes.</p>
      </footer>
    </div>
  )
}

export default Configuracao