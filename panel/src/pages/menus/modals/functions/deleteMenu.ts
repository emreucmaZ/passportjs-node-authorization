import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";

export default function deleteMenu(menuId:string,state:IRootState,handleClose:Function){
    axios.delete(`${REQUEST_URL}/menus/${menuId}`,{
        headers:{
            'Authorization':`Bearer ${state.user.token}`
        }
    }).then((response)=>{
        if(response.status == 204){
            handleClose();
        }
    })
}