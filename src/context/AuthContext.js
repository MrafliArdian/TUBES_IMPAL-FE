import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('auth/me/');
                setUser(response.data);
            } catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
        const response = await api.post('auth/login/', { username, password });
        const { access, refresh } = response.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        
        const userResponse = await api.get('auth/me/');
        setUser(userResponse.data);
        return { success: true };
    } catch (error) {
        console.error("Login failed", error);
        return { success: false, error: error.response?.data?.detail || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setUser(null);
  };
    
  const register = async (username, email, password, confirmPassword, phone_number, full_name) => {
       try {
        await api.post('auth/register/', { 
            username, 
            email, 
            password, 
            password2: confirmPassword, // Backend expects 'password2'
            phone_number, 
            full_name 
        });
        return { success: true };
       } catch (error) {
         console.error("Register failed", error);
         return { success: false, error: error.response?.data };
       }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
