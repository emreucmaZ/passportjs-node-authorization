import { IUser } from "../user";

export interface IBlog{
    _id:string,
    title:string,
    content:string,
    blogImageName:string,
    creator: IUser |null,
    isDeleted:boolean,
    isApproved:boolean
}