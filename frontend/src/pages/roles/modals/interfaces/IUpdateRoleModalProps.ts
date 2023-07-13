import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { NextRouter } from "next/router";
import { RoleDataRow } from "../../types";

export interface IUpdateRoleModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    role:IRole | RoleDataRow,
    router:NextRouter
}