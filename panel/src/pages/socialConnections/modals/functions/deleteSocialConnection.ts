import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import { NextRouter } from "next/router";

export default function deleteSocialConnection(socialConnectionId:string,state:IRootState,handleClose:Function){
    axios.delete(`${REQUEST_URL}/socialConnections/${socialConnectionId}`,{
        headers:{
            'Authorization':`Bearer ${state.user.token}`
        }
    }).then((response)=>{
        if(response.status == 204){
            handleClose();
        }
    })
}