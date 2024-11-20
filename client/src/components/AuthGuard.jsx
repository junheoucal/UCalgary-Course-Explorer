import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');

    if (!userID || userType !== 'it') {
        // Redirect to login if not authenticated or not IT staff
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGuard; 