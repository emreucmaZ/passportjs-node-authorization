import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { IMenu } from "@/redux/interfaces/menu";
import { NextRouter } from "next/router";

export interface IMenuListProps {
    menus:Array<IMenu>,
    permissions:Array<string>,
    state:IRootState,
    router:NextRouter,
    setRefreshWhenDataChange:Function,
}