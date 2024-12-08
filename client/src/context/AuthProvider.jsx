import { createContext, useState, useContext } from "react";

// Create context with a default value
const AuthContext = createContext({
    auth: {
        UCID: null,
        userType: null,
        isAuthenticated: false
    },
    setAuth: () => {}
});

// Custom hook for using auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    // Initialize state with values from localStorage
    const [auth, setAuth] = useState(() => ({
        UCID: localStorage.getItem('userID'),
        userType: localStorage.getItem('userType'),
        isAuthenticated: !!localStorage.getItem('userID')
    }));

    // Add logout function
    const logout = () => {
        updateAuth({
            UCID: null,
            userType: null,
            isAuthenticated: false
        });
    };

    // Wrapper function to update both state and localStorage
    const updateAuth = (newAuthData) => {
        setAuth(newAuthData);
        if (newAuthData.UCID) {
            localStorage.setItem('userID', newAuthData.UCID);
            localStorage.setItem('userType', newAuthData.userType);
        } else {
            localStorage.removeItem('userID');
            localStorage.removeItem('userType');
        }
    };

    return (
        <AuthContext.Provider value={{auth, setAuth: updateAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
