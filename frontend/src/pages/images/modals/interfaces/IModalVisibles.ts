import { IUser } from "@/redux/interfaces/user";

export interface IModalVisibles{
    isUploadModalVisible: boolean,
    isDeleteModalVisible:boolean,
    deletingImageId: null |string
}