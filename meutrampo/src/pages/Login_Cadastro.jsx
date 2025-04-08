import React, { useState } from 'react';
import '../styles.css';
import { supabase } from '../assets/client';
import { useNavigate } from 'react-router-dom';

const Login_Cadastro = ({setToken}) => {
  let navigate = useNavigate()

  const[formDataCadastro, setFormDataCadastro] = useState({
    nome:'', email:'', senha:''
  })

  const[formDataLogin, setFormDataLogin] = useState({
    email:'', senha:''
  })

  function handleChangeCadastro(event){
    setFormDataCadastro((prevFormDataCadastro)=>{
      return{
        ...prevFormDataCadastro,
        [event.target.name]:event.target.value
      }
    })
  }

  function handleChangeLogin(event){
    setFormDataLogin((prevFormDataLogin)=>{
      return{
        ...prevFormDataLogin,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmitCadastro(event){
    event.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formDataCadastro.email,
        password: formDataCadastro.senha,
        options: {
          fullName: formDataCadastro.nome
        }
      })
      alert('Email de verificação enviado')
    } catch (error) {
      alert(error)
    }
  }

  async function handleSubmitLogin(e){
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
      <h1>meu trampo</h1>
    <div className='containerLogin'>
      <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmitCadastro} className='formLogin'>
        <input 
        className='inputLogin'
        placeholder='Nome ou Empresa'
        name='nome'
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

        <button className='buttonLogin' type='submit'>
            Cadastrar
        </button>
      </form>
</div>
      <hr/>

      <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmitLogin} className='formLogin'>
        <input 
        placeholder='Email'
        name='email'
        onChange={handleChangeLogin}
        />
        <input 
        placeholder='Senha'
        name='senha'
        type='password'
        onChange={handleChangeLogin}
        />

        <button className='buttonLogin' type='submit'>
            Login
        </button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default Login_Cadastro