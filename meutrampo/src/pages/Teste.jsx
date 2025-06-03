import { useParams } from 'react-router-dom'
import { supabase } from '../assets/client'
import { useEffect, useState } from 'react'

const Teste = () => {
    const { fullName } = useParams() // Agora capturando o parâmetro corretamente
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('fullname', fullName) // Ou o campo correto da sua tabela
                    .single()

                if (error) throw error
                setUserData(data)
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            } finally {
                setLoading(false)
            }
        }

        if (fullName) {
            fetchUser()
        }
    }, [fullName])

    if (loading) return <div>Carregando...</div>

    return (
        <div>
            {userData ? (
                <div>
                    <h1>Perfil de {userData.fullname}</h1>
                    {/* Outros dados do usuário */}
                </div>
            ) : (
                <p>Usuário {fullName} não encontrado</p>
            )}
        </div>
    )
}

export default Teste