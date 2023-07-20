import { IRootState } from "@/redux/interfaces/IRootState";
import { IUser } from "@/redux/interfaces/user";
import { UserDataRow } from "../../types";
import { NextRouter } from "next/router";

export interface IDeleteUserModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    userId:string,
    router:NextRouter
}