import { useState, useEffect } from "react";
import { useAuth } from "./admin/contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./vozdovacka-crkva/components/layout/loading-screen/LoadingScreen";
import * as React from "react";

const ProtectedRoute = ({ children }: any) => {
    const { user, isLoading } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [user, isLoading]);
console.log(isLoading, user, isLoaded)
    let child: any;
  if (isLoaded && user) {
        child = children;
    } else if (isLoaded && !user) {
      child = <Navigate to="/login" />;
    } else if(!isLoaded) {
      child =  <LoadingScreen />;
    }
  return child;
};

export default ProtectedRoute;