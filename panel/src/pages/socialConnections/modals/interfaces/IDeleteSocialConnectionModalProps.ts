import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface IDeleteSocialConnectionModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    socialConnectionId:string
}