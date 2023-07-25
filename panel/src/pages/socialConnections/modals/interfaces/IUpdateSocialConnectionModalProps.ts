import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";
import { IImage } from "@/pages/images/interfaces/IImage";
import { ISocialConnection } from "@/redux/interfaces/socialConnection";
import { SocialConnectionDataRow } from "../../types";

export interface IUpdateSocialConnectionModalProps{
    isVisible:boolean,
    handleClose:any,
    state:IRootState,
    images:IImage[],
    socialConnection:ISocialConnection | SocialConnectionDataRow,
    router:NextRouter,
}