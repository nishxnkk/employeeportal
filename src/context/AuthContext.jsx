import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('hrms_token');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            setUser(data);
            setIsAuthenticated(true);

            // Trigger data fetch after successful auth
            window.dispatchEvent(new CustomEvent('auth-success'));
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            localStorage.removeItem('hrms_token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('hrms_token', data.token);
            setUser(data);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Invalid credentials'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('hrms_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
