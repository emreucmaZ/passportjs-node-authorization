import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";

export interface ICreateUserModalProps{
    isVisible:boolean,
    handleClose:any,
    roles:IRole[],
    state:IRootState
}