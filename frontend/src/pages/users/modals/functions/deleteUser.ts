import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import { NextRouter } from "next/router";

export default function deleteUser(userId:string,state:IRootState,router:NextRouter){
    axios.delete(`${REQUEST_URL}/deleteUser/${userId}`,{
        headers:{
            'Authorization':`Bearer ${state.user.token}`
        }
    }).then((response)=>{
        if(response.data.durum){
            router.reload();
        }
    })
}