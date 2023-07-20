import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";
import { IImage } from "@/pages/images/interfaces/IImage";
import { IMenu } from "@/redux/interfaces/menu";
import { MenuDataRow } from "../../types";

export interface IUpdateMenuModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    menu:IMenu | MenuDataRow,
    router:NextRouter,
    menus:IMenu[]
}