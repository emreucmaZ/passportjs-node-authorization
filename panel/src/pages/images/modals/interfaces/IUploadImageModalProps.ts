import { IRootState } from "@/redux/interfaces/IRootState";
import { IRole } from "@/redux/interfaces/role/IRole";
import { NextRouter } from "next/router";

export interface IUploadImageModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
}