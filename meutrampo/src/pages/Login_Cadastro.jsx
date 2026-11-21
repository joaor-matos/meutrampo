import React, { useState } from 'react';
import '../styles.css';
import { supabase } from '../assets/client';
import { useNavigate } from 'react-router-dom';

const Login_Cadastro = ({ setToken }) => {
  const navigate = useNavigate();

  const [formDataCadastro, setFormDataCadastro] = useState({
    fullName: '', email: '', senha: ''
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: '', senha: ''
  });

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'cadastro'

  // Visibilidade das senhas
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Força da senha (visual)
  const [passwordStrength, setPasswordStrength] = useState(0);

  const RESERVED_USERNAMES = [
    'portfolio', 'admin', 'meutrampo',
    'configuracao', 'configuração', 'login', 'cadastro'
  ];

  function handleChangeCadastro(event) {
    const { name, value } = event.target;
    setFormDataCadastro(prev => ({ ...prev, [name]: value }));

    if (name === 'senha') {
      let level = 0;
      if (value.length > 0) level = 1;
      if (value.length >= 6) level = 2;
      if (value.length >= 8 && /[0-9!@#$%^&*]/.test(value)) level = 3;
      setPasswordStrength(level);
    }
  }

  function handleChangeLogin(event) {
    setFormDataLogin(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function getErrorMessageCadastro(error) {
    if (error.message.includes('place')) {
      return 'Este nome de usuário não está disponível. Escolha outro.';
    }
    if (error.message.includes('email rate limit exceeded')) {
      return 'Muitas tentativas. Aguarde um pouco.';
    }
    if (error.message.includes('Password should be at least')) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (error.message.includes('Anonymous sign-ins are disabled')) {
      return 'Preencha todos os campos obrigatórios.';
    }
    if (error.message.includes('Database error saving new user')) {
      return 'Este nome de usuário não está disponível. Escolha outro.';
    }
    return 'Erro no cadastro: ' + error.message;
  }

  function isValidUsername(username) {
    return !RESERVED_USERNAMES.includes(username.toLowerCase().trim());
  }

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    if (!isValidUsername(formDataCadastro.fullName)) {
      alert('Este nome de usuário não está disponível. Escolha outro.');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: formDataCadastro.email,
      password: formDataCadastro.senha,
      options: {
        data: { fullName: formDataCadastro.fullName }
      }
    });
    if (error) {
      console.log('ERRO COMPLETO:', error);
      alert(getErrorMessageCadastro(error));
    } else {
      alert('Usuário cadastrado com sucesso!');
      setActiveTab('login');
    }
  };

  async function handleSubmitLogin(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formDataLogin.email,
        password: formDataLogin.senha,
      });
      if (error) throw error;
      alert('Login realizado com sucesso!');
      setToken(data);
      navigate('/configuracao');
    } catch (error) {
      alert(error.message || error);
    }
  }

  return (
    <div className="auth-screen">
      {/* Formas de fundo */}
      <div className="auth-shape auth-shape-1" aria-hidden="true"></div>
      <div className="auth-shape auth-shape-2" aria-hidden="true"></div>

      {/* Cabeçalho */}
      <header className="auth-header">
        <h1 className="auth-brand">meu trampo</h1>
        <p className="auth-tagline">Seu portfólio compacto, em um só link.</p>
      </header>

      {/* Cartão principal */}
      <main className="auth-main">
        <div className="auth-card">

          {/* Lado esquerdo (showcase) – apenas desktop */}
          <section className="auth-showcase">
            <div className="auth-showcase-glow"></div>
            <div>
              <h2 className="auth-showcase-title">
                Crie sua página profissional em menos de 2 minutos.
              </h2>
              <p className="auth-showcase-text">
                Centralize seus melhores projetos, redes sociais, links para orçamentos e meios de contato.
              </p>
            </div>
          </section>

          {/* Lado direito (formulários) */}
          <section className="auth-form-side">

            {/* Abas */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Entrar
              </button>
              <button
                type="button"
                className={`auth-tab ${activeTab === 'cadastro' ? 'active' : ''}`}
                onClick={() => setActiveTab('cadastro')}
              >
                Criar conta
              </button>
            </div>

            {/* Painel LOGIN */}
            {activeTab === 'login' && (
              <div className="auth-panel">
                <form className="auth-form" onSubmit={handleSubmitLogin}>
                  <div className="auth-field">
                    <label htmlFor="login-email" className="auth-label">E-mail</label>
                    <input
                      id="login-email"
                      className="auth-input"
                      placeholder="nome@exemplo.com"
                      name="email"
                      type="email"
                      required
                      onChange={handleChangeLogin}
                    />
                  </div>

                  <div className="auth-field">
                    <label htmlFor="login-password" className="auth-label">Senha</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="login-password"
                        className="auth-input"
                        placeholder="Sua senha secreta"
                        name="senha"
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        onChange={handleChangeLogin}
                      />
                      <button
                        type="button"
                        className="auth-toggle-pass"
                        onClick={() => setShowLoginPassword(v => !v)}
                        aria-label="Mostrar ou ocultar senha"
                      >
                        {showLoginPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <button className="auth-submit" type="submit">
                    Entrar na minha conta
                  </button>
                </form>
              </div>
            )}

            {/* Painel CADASTRO */}
            {activeTab === 'cadastro' && (
              <div className="auth-panel">
                <form className="auth-form" onSubmit={handleSubmitCadastro}>
                  <div className="auth-field">
                    <label htmlFor="reg-handle" className="auth-label">Escolha seu link</label>
                    <div className="auth-prefix-group">
                      <span className="auth-prefix">meutrampo.bio/</span>
                      <input
                        id="reg-handle"
                        className="auth-input auth-input-inline"
                        placeholder="seunome"
                        name="fullName"
                        type="text"
                        required
                        onChange={handleChangeCadastro}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="reg-email" className="auth-label">E-mail</label>
                    <input
                      id="reg-email"
                      className="auth-input"
                      placeholder="seu@melhoremail.com"
                      name="email"
                      type="email"
                      required
                      onChange={handleChangeCadastro}
                    />
                  </div>

                  <div className="auth-field">
                    <label htmlFor="reg-password" className="auth-label">Crie uma senha</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-password"
                        className="auth-input"
                        placeholder="Pelo menos 6 caracteres"
                        name="senha"
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        onChange={handleChangeCadastro}
                      />
                      <button
                        type="button"
                        className="auth-toggle-pass"
                        onClick={() => setShowRegisterPassword(v => !v)}
                        aria-label="Mostrar ou ocultar senha"
                      >
                        {showRegisterPassword ? '🙈' : '👁️'}
                      </button>
                    </div>

                    {/* Barra de força */}
                    <div className="auth-strength">
                      <div className={`auth-strength-bar level-${passwordStrength >= 1 ? '1' : '0'}`}></div>
                      <div className={`auth-strength-bar level-${passwordStrength >= 2 ? '2' : '0'}`}></div>
                      <div className={`auth-strength-bar level-${passwordStrength >= 3 ? '3' : '0'}`}></div>
                    </div>
                  </div>

                  <button className="auth-submit" type="submit">
                    Criar meu trampo grátis
                  </button>
                </form>
              </div>
            )}

            <p className="auth-terms">
              Ao continuar, você concorda com nossos{' '}
              <a href="#">Termos de Serviço</a> e{' '}
              <a href="#">Política de Privacidade</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="auth-footer">
        © 2025 meu trampo — Feito com paixão para impulsionar talentos independentes.
      </footer>
    </div>
  );
};

export default Login_Cadastro;