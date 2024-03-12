

import {useState, useEffect}  from "react";
import {useAuth} from "./admin/contexts/AuthProvider";
import Login from "./admin/content/pages/Login/Login";
import SuspenseLoader from "./admin/components/SuspenseLoader";

const ProtectedRoute = ({children}: any) => {
    const {user, isLoading} = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [user, isLoading]);
    let child: any;
    if (isLoaded && user) {
        child = children;
    } else if (isLoaded && !user) {
        child = <Login/>;
    } else if (!isLoaded) {
        child = <SuspenseLoader/>;
    }
    return child;
};

export default ProtectedRoute;