import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface ICreateBlogModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    images:IImage[],
    router:NextRouter,
}