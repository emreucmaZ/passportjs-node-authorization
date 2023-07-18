import { IUser } from "../user";

export interface ILog{
    _id:string,
    user:IUser,
    table:string,
    data:Object,
    timestamp:Date
}