import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { IUser } from "@/redux/interfaces/user";
import { NextRouter } from "next/router";

export interface IUserListProps {
    users:Array<IUser>,
    permissions:Array<string>,
    roles:IRole[],
    state:IRootState,
    router:NextRouter,
    setRefreshWhenDataChange:Function
}