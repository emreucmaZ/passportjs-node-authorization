import axios from "axios";
import { ICreateUpdateRoleForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export default function createRole(createRoleForm:ICreateUpdateRoleForm,state:IRootState,handleClose:Function){

        axios.post(REQUEST_URL+'/roles',createRoleForm,{
            headers:{
                'Authorization' : `Bearer  ${state.user.token}`
            }
        }).then((response)=>{
            if(response.data.durum){
                handleClose();
            }
        })
}