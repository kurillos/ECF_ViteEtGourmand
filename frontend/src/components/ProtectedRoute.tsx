import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {

    const authStr = localStorage.getItem('auth');
    const auth = authStr ? JSON.parse(authStr) : null;

    if (!auth || !auth.token) {
        return <Navigate to="/login" replace />;
    }

    const userRoles = auth.roles || [];

    if (allowedRoles) {
        const hasAccess = userRoles.some((role: string) => 
            allowedRoles.includes(role)
        );

        if (!hasAccess) {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
