import { auth_app } from "~/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default async function useSignUp(email:string, password:string){
    let result = null
    let error = null

    try{
        result = await createUserWithEmailAndPassword(auth_app, email, password)
    } catch(err){
        error = err
    }

    return {result, error}
}