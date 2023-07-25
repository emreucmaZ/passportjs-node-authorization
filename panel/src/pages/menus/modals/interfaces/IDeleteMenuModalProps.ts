import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface IDeleteMenuModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    menuId:string,
    router:NextRouter
}