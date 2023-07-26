import { IUser } from "@/redux/interfaces/user"

export type BlogDataRow = {
    _id : string,
    title:string,
    content:string,
    blogImageName:string,
    creator:IUser,
    isDeleted:boolean,
    isApproved:boolean
}