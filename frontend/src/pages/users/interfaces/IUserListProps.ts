import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { IUser } from "@/redux/interfaces/user";

export interface IUserListProps {
    users:Array<IUser>,
    permissions:Array<string>,
    roles:IRole[],
    state:IRootState
}