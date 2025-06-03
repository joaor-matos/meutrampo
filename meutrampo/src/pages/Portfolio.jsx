import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../assets/client"

const Teste = () => {
  const { username } = useParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('fullname')
          .eq('username', username)
          .single();

        console.log('Debug:', { data, error }); // Depuração

        if (error) throw error;
        if (data) setName(data.fullname);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{name || 'Perfil não encontrado'}</h1>
      {!name && <p>Nenhum usuário encontrado com o nome: {username}</p>}
    </div>
  );
    }

    export default Teste