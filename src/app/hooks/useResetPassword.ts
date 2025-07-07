import { auth_app } from "~/config";
import { sendPasswordResetEmail } from "firebase/auth";
export default async function useResetPassword(email:string){
    let result = null
    let error = null

    try{
        result = await sendPasswordResetEmail(auth_app, email);
    } catch(err){
        error = err
    }

    return {result, error}
}