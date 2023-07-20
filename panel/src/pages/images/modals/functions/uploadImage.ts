import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { IUploadImageForm } from "../interfaces";

export default function uploadImage(uploadImageForm:IUploadImageForm,state:IRootState,handleClose:Function){
        axios.post(REQUEST_URL+'/images',uploadImageForm,{
            headers:{
                'Authorization' : `Bearer  ${state.user.token}`,
             "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            handleClose();
        }).catch(err=>
            console.error(err))
}