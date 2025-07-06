import { auth_app, githubProvider } from "~/config";
import { signInWithPopup } from "firebase/auth";
export default async function useSignInWithGithub(){
    let result = null
    let error = null

    try{
        //sign in with google 
        result = await signInWithPopup(auth_app, githubProvider);
        //result.user is the user object
        console.log("User signed in with Google:", result.user);

    } catch(err){
        error = err
    }

    return {result, error}
}