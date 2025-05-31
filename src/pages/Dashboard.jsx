import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { auth } = useAuth();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (auth.roles.length > 0) {
            setMessage(`Sveiki, jūsų vartotojo duomenys ir rolė yra: ${auth.roles.join(', ')}`);
        } else {
            setMessage('Rolė nerasta arba jūs neprisijungę.');
        }
    }, [auth]);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;