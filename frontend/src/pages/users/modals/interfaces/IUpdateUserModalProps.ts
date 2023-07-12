import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { IUser } from "@/redux/interfaces/user";
import { UserDataRow } from "../../types";

export interface IUpdateUserModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    user:IUser | UserDataRow,
    roles:IRole[]
}