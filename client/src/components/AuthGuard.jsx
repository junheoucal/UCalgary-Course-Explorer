import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children, userType }) => {
    const location = useLocation();
    const storedUserType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');

    // Debug log
    console.log('AuthGuard Check:', {
        storedUserType,
        requiredUserType: userType,
        userID
    });

    if (!userID || storedUserType !== userType) {
        // Redirect to appropriate login page based on userType
        return <Navigate 
            to={`/${userType}pages/login`} 
            state={{ from: location }} 
            replace 
        />;
    }

    return children;
};

export default AuthGuard; 