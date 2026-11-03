import React, { useState } from 'react';
import '../styles.css';
import { supabase } from '../assets/client';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login_Cadastro = ({ setToken }) => {
  let navigate = useNavigate()

  const [formDataCadastro, setFormDataCadastro] = useState({
    fullName: '', email: '', senha: ''
  })

  const [formDataLogin, setFormDataLogin] = useState({
    email: '', senha: ''
  })

  // Registrar mudanças no input de Cadastro

  function handleChangeCadastro(event) {
    setFormDataCadastro((prevFormDataCadastro) => {
      return {
        ...prevFormDataCadastro,
        [event.target.name]: event.target.value
      }
    })
  }

  // Registrar mudanças no input de Login

  function handleChangeLogin(event) {
    setFormDataLogin((prevFormDataLogin) => {
      return {
        ...prevFormDataLogin,
        [event.target.name]: event.target.value
      }
    })
  }

  // Constante para armazenar nomes reservados
  const RESERVED_USERNAMES = [
    'portfolio', 'admin', 'meutrampo',
    'configuracao', 'configuração', 'login', 'cadastro'
  ];


  // Função para pegar erros no cadastro

  function getErrorMessageCadastro(error) {
    if (error.message.includes('place')) {
      return 'Este nome de usuário não está disponível. Escolha outro.';
    }
    if (error.message.includes('email rate limit exceeded')) {
      return 'Este nome de usuário já está em uso. Escolha outro';
    }
    if (error.message.includes('Password should be at least')) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (error.message.includes('Anonymous sign-ins are disabled')) {
      return 'Preencha todos os campos obrigatórios.';
    }
    return 'Erro no cadastro: ' + error.message;
  }

  // Função especifica para pegar erros de nomes reservados
  function isValidUsername(username) {
    return !RESERVED_USERNAMES.includes(username.toLowerCase().trim());
  }

  // Cadastro

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
        data: {
          fullName: formDataCadastro.fullName
        }
      }
    });
    if (error) {
      console.log('ERRO COMPLETO:', error);
      alert(getErrorMessageCadastro(error));
    } else {
      alert('Usuário cadastrado com sucesso!');
    }
  }

  // Login

  async function handleSubmitLogin(e) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formDataLogin.email,
        password: formDataLogin.senha,
      })
      if (error) throw error
      alert('Login realizado com sucesso!')
      setToken(data)
      navigate('/configuracao')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='backgroundLogin'>
      <div className='headerLogin'>
        <div className='containerLogoLogin'>
          <img src={logo} alt="Logo Meu Trampo" />
        </div>
        <h1 className='meutrampotext'>meu trampo</h1>
      </div>
      <div className='containerLogin'>

        {/* Form de Cadastro */}

        <div>


          <form onSubmit={handleSubmitCadastro} className='formContent'>
            <h2 className='formText'>Cadastro</h2>
            <div className='containerInput'>
              <input
                className='inputLogin'
                placeholder='Nome ou Empresa'
                name='fullName'
                onChange={handleChangeCadastro}
              />
              <input
                className='inputLogin'
                placeholder='Email'
                name='email'
                onChange={handleChangeCadastro}
              />
              <input
                className='inputLogin'
                placeholder='Senha'
                name='senha'
                type='password'
                onChange={handleChangeCadastro}
              />
            </div>

            <button className='buttonSubmit' type='submit'>
              Cadastrar
            </button>
          </form>
        </div>
        <hr />

        {/* Form de Login */}

        <div className='containerForm'>
          <form onSubmit={handleSubmitLogin} className='formContent'>
            <h2 className='formText'>Login</h2>
            <div className='containerInput'>
              <input
                className='inputLogin'
                placeholder='Email'
                name='email'
                onChange={handleChangeLogin}
              />
              <input
                className='inputLogin'
                placeholder='Senha'
                name='senha'
                type='password'
                onChange={handleChangeLogin}
              />
            </div>
            <button className='buttonSubmit' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
      <h6 className='footerTextLogin'>meutrampo - Feito com paixão para impulsionar talentos independentes.</h6>
    </div>
  )
}

export default Login_Cadastro