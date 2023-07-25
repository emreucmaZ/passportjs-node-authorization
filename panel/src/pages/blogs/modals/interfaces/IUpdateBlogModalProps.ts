import { IRootState } from "@/redux/interfaces/IRootState";
import { IBlog } from "@/redux/interfaces/blog";
import { NextRouter } from "next/router";
import { BlogDataRow } from "../../types";
import { IImage } from "@/pages/images/interfaces/IImage";

export interface IUpdateBlogModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    blog:IBlog | BlogDataRow,
    router:NextRouter,
    images:IImage[]
}