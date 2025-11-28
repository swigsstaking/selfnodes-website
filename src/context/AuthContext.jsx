import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSiteInfo } from '../hooks/useSiteInfo';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const site = useSiteInfo(); // Corrected: hook returns the site object directly

  useEffect(() => {
    // Check localStorage on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        password,
        ...(site?._id && { siteId: site._id })
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Login failed');
    }

    const customerData = result.data; // API returns { data: { token, ...customer } }

    localStorage.setItem('token', customerData.token);
    localStorage.setItem('user', JSON.stringify(customerData));
    setUser(customerData);
    
    return customerData;
  };

  const register = async (name, email, password) => {
    // Split name into firstName and lastName
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || nameParts[0];

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        firstName,
        lastName,
        email, 
        password,
        ...(site?._id && { siteId: site._id })
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Registration failed');
    }

    const customerData = result.data;

    localStorage.setItem('token', customerData.token);
    localStorage.setItem('user', JSON.stringify(customerData));
    setUser(customerData);
    
    return customerData;
  };

  const loginWithGoogle = async (credential) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customers/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        credential,
        ...(site?._id && { siteId: site._id })
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Google login failed');
    }

    const customerData = result.data;

    localStorage.setItem('token', customerData.token);
    localStorage.setItem('user', JSON.stringify(customerData));
    setUser(customerData);
    
    return customerData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Get Google Client ID from site config
  const googleClientId = site?.googleOAuthConfig?.clientId;

  const contextValue = {
    user,
    login,
    register,
    loginWithGoogle,
    logout,
    loading,
    isAuthenticated: !!user,
    site,
    googleClientId
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
