import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../assets/client"

const Teste = () => {
    const { fullName } = useParams();
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
        <div>
            <h1>{profile.fullName || fullName}</h1>
            <p>Email: {profile.email}</p>
        </div>
    )
}

export default Teste