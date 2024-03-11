import { useState, useEffect } from "react";
import { useAuth } from "./admin/contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./client/components/layout/loading-screen/LoadingScreen";
import * as React from "react";
import Login from "./admin/content/pages/Login/Login";
import SuspenseLoader from "./admin/components/SuspenseLoader";

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
      child = <Login />;
    } else if(!isLoaded) {
      child =  <SuspenseLoader />;
    }
  return child;
};

export default ProtectedRoute;