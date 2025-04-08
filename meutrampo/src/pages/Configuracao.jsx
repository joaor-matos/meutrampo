import React from 'react'

const Configuracao = ({token}) => {
  return (
    <div>Olá, {token.user.user_metadata.name}</div>
  )
}

export default Configuracao