// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, roles: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRoles = JSON.parse(localStorage.getItem('roles'));

        if (storedToken && storedRoles) {
            setAuth({ token: storedToken, roles: storedRoles });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:8888/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Login failed');

            // Save to state + localStorage
            setAuth({ token: data.token, roles: data.roles });
            localStorage.setItem('token', data.token);
            localStorage.setItem('roles', JSON.stringify(data.roles));

            navigate('/dashboard');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
