import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
    path: string;
    isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path, isAuthenticated }) => {
    return (
        <Route
            path={path}
            element={isAuthenticated ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;