import axios from "axios";
import { ICreateUpdateUserForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";

export default function createUser(createUserForm:ICreateUpdateUserForm,state:IRootState){
    if(createUserForm.username.length > 0 && createUserForm.password.length > 0){
        axios.post(REQUEST_URL+'/createUser',createUserForm,{
            headers:{
                'Authorization' : `Bearer  ${state.user.token}`
            }
        }).then((response)=>{
            alert(response.data.message)
        })
    }
}