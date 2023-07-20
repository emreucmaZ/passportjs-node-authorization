import { RoleDataRow } from "../../types";
import { IRole } from "@/redux/interfaces/role/IRole";

export interface IModalVisibles{
    isCreateModalVisible: boolean,
    isUpdateModalVisible: boolean,
    updatingRole: IRole | null | RoleDataRow,
    isDeleteModalVisible:boolean,
    deletingRoleId: null |string
}