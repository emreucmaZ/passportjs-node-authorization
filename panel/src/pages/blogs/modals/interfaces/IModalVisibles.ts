import { IBlog } from "@/redux/interfaces/blog";
import { BlogDataRow } from "../../types";
import { ImageDataRow } from "@/pages/images/types";

export interface IModalVisibles{
    isCreateModalVisible: boolean,
    isUpdateModalVisible: boolean,
    updatingBlog: IBlog | null | BlogDataRow,
    isDeleteModalVisible:boolean,
    deletingBlogId: null |string,
    isFullscreenVisible: boolean,
    selectedImage: null |string,
}