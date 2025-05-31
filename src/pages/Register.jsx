import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8888/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Registration failed');

            alert('Registration successful! You can now log in.');
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <br />
                <button type="submit">Register</button>
            </form>
            <p>Jau turite paskyrą? <a href="/login">Prisijunkite</a></p>
        </div>
    );
};

export default RegisterPage;