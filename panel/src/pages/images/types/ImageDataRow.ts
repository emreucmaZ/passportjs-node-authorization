import { IUser } from "@/redux/interfaces/user"

export type ImageDataRow = {
    _id : string,
    title:string,
    filename:string,
    creator:IUser
}