import axios from "axios";
import { ICreateUpdateUserForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export default function createUser(createUserForm:ICreateUpdateUserForm,state:IRootState,handleClose:Function){
        axios.post(REQUEST_URL+'/users',createUserForm,{
            headers:{
                'Authorization' : `Bearer  ${state.user.token}`
            }
        }).then((response)=>{
            handleClose();
        })
}