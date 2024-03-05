import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '../firebase';

class AuthService {
    login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    checkAuth = () => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };
}

export default new AuthService();