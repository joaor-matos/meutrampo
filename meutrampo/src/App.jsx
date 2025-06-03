import React, { useEffect, useState } from 'react'
import { Login_Cadastro, Configuracao, Portfolio } from './pages'
import { Routes, Route } from 'react-router-dom'
import Teste from './pages/Teste'

const App = () => {
  const [token, setToken] = useState(false)

  // Persistência do token
  useEffect(() => {
    if(token) {
      sessionStorage.setItem('token', JSON.stringify(token))
    }
  }, [token])

  // Recuperação do token
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if(storedToken) {
      setToken(JSON.parse(storedToken))
    }
  }, [])

  return (
    <div>
      <Routes>
        {/* Rota pública principal */}
        <Route path="/" element={<Login_Cadastro setToken={setToken} />} />
        
        {/* Rota dinâmica para perfis - DEVE VIR ANTES de rotas específicas */}
        <Route path="/:fullName" element={<Teste />} />
        
        {/* Rotas protegidas */}
        {token && (
          <>
            <Route path="/configuracao" element={<Configuracao token={token} />} />
          </>
        )}
        
        {/* Rotas de portfolio */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:fullName" element={<Portfolio />} />
      </Routes>
    </div>
  )
}

export default App