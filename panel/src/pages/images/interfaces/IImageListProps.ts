import { IRootState } from "@/redux/interfaces/IRootState";
import { IImage } from "./IImage";

export interface IImageListProps {
    images:IImage[],
    permissions:Array<string>,
    state:IRootState,
    setRefreshWhenDataChange:Function
}