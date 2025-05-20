import React from 'react'
import '../styles.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../assets/client"

const Portfolio = ({token}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('fullName', fullName)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [fullName]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;
  return (
    <div className='backgroundLogin'>
      
    <div className='containerPortfolio'>

        <h1 className='portfolioNome'>{token.user.user_metadata.fullName}</h1>
        
    </div>
    </div>
  )
}

export default Portfolio