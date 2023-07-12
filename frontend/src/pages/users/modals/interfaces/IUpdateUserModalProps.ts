import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { IUser } from "@/redux/interfaces/user";
import { UserDataRow } from "../../types";
import { NextRouter } from "next/router";

export interface IUpdateUserModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    user:IUser | UserDataRow,
    roles:IRole[],
    router:NextRouter
}