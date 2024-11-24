import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context with a default value of null
const AuthContext = createContext(null);

// Provider component that wraps your app and makes auth object available to any child component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        userID: localStorage.getItem('userID'),
        userType: localStorage.getItem('userType'),
        isAuthenticated: false
    });

    // Update auth state when component mounts
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        const userType = localStorage.getItem('userType');
        
        setUser({
            userID,
            userType,
            isAuthenticated: !!userID && userType === 'it'
        });
    }, []);

    // Login function
    const login = (userID, userType) => {
        localStorage.setItem('userID', userID);
        localStorage.setItem('userType', userType);
        setUser({
            userID,
            userType,
            isAuthenticated: true
        });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('userID');
        localStorage.removeItem('userType');
        setUser({
            userID: null,
            userType: null,
            isAuthenticated: false
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 