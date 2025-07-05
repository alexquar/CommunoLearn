import { auth_app, provider } from "~/config";
import { signInWithPopup } from "firebase/auth";
export default async function useSignInWithGoogle(){
    let result = null
    let error = null

    try{
        //sign in with google 
        result = await signInWithPopup(auth_app, provider);
        //result.user is the user object
        console.log("User signed in with Google:", result.user);

    } catch(err){
        error = err
    }

    return {result, error}
}