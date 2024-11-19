import { auth_app } from "~/config";
import { signOut } from "firebase/auth";
export default async function useSignout(){
    let result = null
    let error = null

    try{
        result = await signOut(auth_app)
    } catch(err){
        error = err
    }

    return {result, error}
}