import { Navigate } from "react-router";


interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]; // On change 'role: string' en 'allowedRoles: string[]'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }

    // Si on a défini des rôles autorisés, on vérifie si l'utilisateur en possède au moins UN
    if (allowedRoles) {
        const hasAccess = user.roles.some((role: string) => allowedRoles.includes(role));
        if (!hasAccess) {
            return <Navigate to="/" replace />; 
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;