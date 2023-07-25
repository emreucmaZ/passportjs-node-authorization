import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { NextRouter } from "next/router";

export interface ICreateUserModalProps{
    isVisible:boolean,
    handleClose:any,
    roles:IRole[],
    state:IRootState,
    router:NextRouter,
}