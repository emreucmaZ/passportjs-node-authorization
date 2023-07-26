import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { IBlog } from "@/redux/interfaces/blog/IBlog";
import { NextRouter } from "next/router";

export interface IBlogListProps {
    blogs:Array<IBlog>,
    permissions:Array<string>,
    state:IRootState,
    router:NextRouter,
    setRefreshWhenDataChange:Function,
    images: IImage[],
    setListUnapprovedBlogs:Function,
    listUnapprovedBlogs:boolean
}