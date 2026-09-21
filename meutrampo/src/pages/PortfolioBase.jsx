import { useParams } from 'react-router-dom'
import { supabase } from '../assets/client'
import { useEffect, useState } from 'react'

const PortfolioBase = () => {
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

                // Buscar links do usuário
                const { data: linksData, error: linksError } = await supabase
                    .from('links')
                    .select('*')
                    .eq('id_user', data.id)
                    .order('created_at', { ascending: true })

                if (linksError) {
                    console.error('Erro ao buscar links:', linksError)
                } else {
                    setUserLinks(linksData || [])
                }
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
                            <h1 className='portfolioNome'>{userData.fullname}</h1>
                            <p className='portfolioBio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquam nisl. Nullam pellentesque finibus diam, in feugiat orci consectetur interdum. Etiam blandit semper lorem nec auctor. In in enim in neque fringilla placerat. Suspendisse turpis dolor, sodales et maximus in, convallis in lectus. Aenean tristique massa nec ex placerat consequat. Vivamus scelerisque vehicula iaculis</p>
                            <div>
                                {userLinks.map((link) => (
                                    <div className='linkComponent' key={link.id_link}>
                                        <a
                                            className='linkButton'
                                            href={/^https?:\/\//i.test(link.link_url) ? link.link_url : `https://${link.link_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.link_title}
                                        </a>
                                    </div>
                                ))}
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

export default PortfolioBase