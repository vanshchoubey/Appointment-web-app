import { useContext } from "react";
import { authContext } from "../context/AuthContext";

const useAuthContext=()=>{
    return useContext(authContext)
}
export default useAuthContext