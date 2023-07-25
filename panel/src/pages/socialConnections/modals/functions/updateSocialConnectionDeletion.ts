import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import { NextRouter } from "next/router";

export default function updateSocialConnectionDeletion(socialConnectionId:string,state:IRootState,handleClose:Function,isDeleted:boolean,setRefreshWhenDataChange:Function){
    axios.put(`${REQUEST_URL}/updateSocialConnectionDeletion/${socialConnectionId}`,{isDeleted:isDeleted},{
        headers:{
            'Authorization':`Bearer ${state.user.token}`
        }
    }).then((response)=>{
        setRefreshWhenDataChange(Math.random() * 91238);
        if(response.status == 204){
            handleClose();
        }
    })
}