import { useParams } from 'react-router-dom'
import { supabase } from '../assets/client'
import { useEffect, useState } from 'react'

const Teste = () => {
    const { fullName } = useParams() // Agora capturando o parâmetro corretamente
    const [userData, setUserData] = useState(null)
    const [userLinks, setUserLinks] = useState([]);
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
                    
                    {/* Outros dados do usuário */}
                    <div className='backgroundLogin'>

                        <div className='containerPortfolio'>
                            <img className='portfolioBanner'></img>
                            <h1 className='portfolioNome'>{userData.fullname}</h1>
                            <p className='portfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis.</p>
                            <div>
                                <div className='linkComponent'>
                                    <img className='linkIcone'></img>
                                    <text className='linkButton'>Link1</text>
                                </div>
                                <div className='linkComponent'>
                                    <img className='linkIcone'></img>
                                    <text className='linkButton'>Link2</text>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            ) : (
                <p>Usuário {fullName} não encontrado</p>
            )}

        </div>
    )
}

export default Teste