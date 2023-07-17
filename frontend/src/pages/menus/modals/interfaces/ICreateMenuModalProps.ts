import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { IMenu } from "@/redux/interfaces/menu";
import { NextRouter } from "next/router";

export interface ICreateMenuModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    router:NextRouter,
    menus:IMenu[]
}