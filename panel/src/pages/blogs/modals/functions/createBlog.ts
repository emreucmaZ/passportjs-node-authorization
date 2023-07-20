import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { ICreateUpdateBlogForm } from "../interfaces";

export default function createBlog(createBlogForm:ICreateUpdateBlogForm,state:IRootState,handleClose:Function){
        axios.post(REQUEST_URL+'/blogs',createBlogForm,{
            headers:{
                'Authorization' : `Bearer  ${state.user.token}`
            }
        }).then((response)=>{
            handleClose();
        })
}