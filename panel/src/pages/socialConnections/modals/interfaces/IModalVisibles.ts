import { SocialConnectionDataRow } from "../../types";
import { ImageDataRow } from "@/pages/images/types";
import { ISocialConnection } from "@/redux/interfaces/socialConnection";

export interface IModalVisibles{
    isCreateModalVisible: boolean,
    isUpdateModalVisible: boolean,
    updatingSocialConnection: ISocialConnection | null | SocialConnectionDataRow,
    isDeleteModalVisible:boolean,
    deletingSocialConnectionId: null |string,
    isFullscreenVisible: boolean,
    selectedImage: null | string,
}