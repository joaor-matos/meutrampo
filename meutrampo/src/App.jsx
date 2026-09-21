import React, { useEffect, useState } from 'react'
import { Login_Cadastro, Configuracao } from './pages'
import { Routes, Route } from 'react-router-dom'
import PortfolioBase from './pages/PortfolioBase'
import LandingPage from './pages/LandingPage'

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

        {/* Rota landing page */}
        <Route path="/page" element={<LandingPage />} />
        
        {/* Rota dinâmica para perfis - DEVE VIR ANTES de rotas específicas */}
        <Route path="/portfolio/:fullName" element={<PortfolioBase />} />
        
        {/* Rotas protegidas */}
        {token && (
          <>
            <Route path="/configuracao" element={<Configuracao token={token} />} />
          </>
        )}
        
      </Routes>
    </div>
  )
}

export default App