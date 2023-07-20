import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface IDeleteRoleModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    roleId:string,
    router:NextRouter
}