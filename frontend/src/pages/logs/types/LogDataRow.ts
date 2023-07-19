import { IUser } from "@/redux/interfaces/user"

export type LogDataRow = {
    _id:string,
    user:IUser,
    table:string,
    data:Object |null,
    timestamp:Date,
    type:string,
    oldData:Object|null,
    deletedData:Object|null
}