import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export interface IDeleteBlogModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    blogId:string,
    router:NextRouter
}