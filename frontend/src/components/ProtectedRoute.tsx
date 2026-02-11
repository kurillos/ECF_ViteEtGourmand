import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }

    const userRoles = user.user?.roles || []; 

    if (allowedRoles) {
        const hasAccess = userRoles.some((role: string) => allowedRoles.includes(role));
        
        if (!hasAccess) {
            console.warn("Accès refusé : Rôles insuffisants", userRoles);
            return <Navigate to="/" replace />; 
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;