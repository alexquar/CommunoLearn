import { auth_app, provider } from "~/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "~/context/AuthContext";

export default function useSignInWithGoogle() {
    const { setToken } = useAuthContext();

    const signIn = async () => {
        let result = null
        let error = null

        try {
            //sign in with google 
            result = await signInWithPopup(auth_app, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            if (token) {
                setToken(token); // Set the token in the context
                console.log("Google access token:", token);
            } else {
                console.warn("No access token received from Google sign-in.");
            }
            //result.user is the user object
            console.log("User signed in with Google:", result.user);

        } catch (err) {
            error = err
        }

        return { result, error }
    }

    return signIn;
}