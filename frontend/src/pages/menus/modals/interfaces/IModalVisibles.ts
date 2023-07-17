import { ImageDataRow } from "@/pages/images/types";
import { IMenu } from "@/redux/interfaces/menu";
import { MenuDataRow } from "../../types";

export interface IModalVisibles{
    isCreateModalVisible: boolean,
    isUpdateModalVisible: boolean,
    updatingMenu: IMenu | null | MenuDataRow,
    isDeleteModalVisible:boolean,
    deletingMenuId: null |string,
}