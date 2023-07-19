import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface ICreateSocialConnectionModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState
}