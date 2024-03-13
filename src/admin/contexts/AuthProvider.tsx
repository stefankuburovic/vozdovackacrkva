import React, { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { User } from "firebase/auth";
import {UserCredential} from "@firebase/auth";

const AuthContext = createContext({
    loginFunction: {} as (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise.resolve(),
    user: {} as User | null,
    uid: '' as string | null,
    isLoading: false,
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUser(user);
                setUid(user?.uid);
            } else {
                setUser(null);
                setUid(null);
            }

            setIsLoading(false);
        });

        return () => {
            listen();
        };
    }, []);

    const loginFunction  = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                loginFunction,
                logout,
                user,
                uid,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);