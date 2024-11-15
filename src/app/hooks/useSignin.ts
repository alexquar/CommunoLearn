import { auth_app } from "config";
import { signInWithEmailAndPassword } from "firebase/auth";
export default async function useSignIn(email:string, password:string){
    let result = null
    let error = null

    try{
        result = await signInWithEmailAndPassword(auth_app, email, password)
    } catch(err){
        error = err
    }

    return {result, error}
}