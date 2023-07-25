import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface IDeleteImageModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    imageId:string |null,
}