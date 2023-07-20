import { REQUEST_URL } from "@/variables";
import axios from "axios";

export function isAuthorized(token:string | null,setState:any){
    axios.get(REQUEST_URL+'/isAuthorized',{headers:{
        'Authorization':`Bearer ${token}`
    }}).then((response)=>{
        setState(response.data);
    }).catch(err=>{
    })
}