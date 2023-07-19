import { IImage } from "@/pages/images/interfaces/IImage";
import { IRootState } from "@/redux/interfaces/IRootState";
import { ISocialConnection } from "@/redux/interfaces/socialConnection";
import { NextRouter } from "next/router";

export interface ISocialConnectionListProps {
    socialConnections:Array<ISocialConnection>,
    permissions:Array<string>,
    state:IRootState,
    router:NextRouter,
    setRefreshWhenDataChange:Function
}