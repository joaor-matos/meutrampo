import React, { useEffect, useState } from 'react'
import { Login_Cadastro, Configuracao, Portfolio } from './pages'
import {Routes, Route} from 'react-router-dom'

const App = () => {

  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
  if(sessionStorage.getItem('token')){
    let data = JSON.parse(sessionStorage.getItem('token'))
    setToken(data)
  }

  }, [])
  

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Login_Cadastro setToken={setToken}/>}/>
        {token?<Route path={'/configuracao'} element={<Configuracao token={token} />}/>:''}
        <Route path={'/portfolio'} element={<Portfolio/>}/>
        <Route path={'/portfolio/:fullName'} element={<Portfolio/>}/>
      </Routes>
    </div>
  )
}

export default App