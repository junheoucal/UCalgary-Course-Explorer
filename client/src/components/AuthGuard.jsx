import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AuthGuard = ({ children, userType }) => {
    const location = useLocation();
    const { auth } = useAuth();

    // Debug log
    console.log('AuthGuard Check:', {
        contextUserType: auth.userType,
        requiredUserType: userType,
        UCID: auth.UCID
    });

    if (!auth.UCID || auth.userType !== userType) {
        return <Navigate 
            to={`/${userType}pages/login`} 
            state={{ from: location }} 
            replace 
        />;
    }

    return children;
};

export default AuthGuard; 