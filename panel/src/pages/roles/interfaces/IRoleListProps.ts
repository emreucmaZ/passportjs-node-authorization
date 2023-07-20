import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { NextRouter } from "next/router";

export interface IRoleListProps {
    roles:IRole[],
    permissions:Array<string>,
    state:IRootState,
    router:NextRouter,
    setRefreshWhenDataChange:any
}