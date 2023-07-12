import { IUser } from "@/redux/interfaces/user";
import { UserDataRow } from "../../types";

export interface IModalVisibles{
    isCreateModalVisible: boolean,
    isUpdateModalVisible: boolean,
    updatingUser: IUser | null | UserDataRow,
    isDeleteModalVisible:boolean,
    deletingUserId: null |string
}