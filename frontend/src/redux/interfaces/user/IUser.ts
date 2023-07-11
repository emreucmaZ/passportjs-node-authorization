import { Types as MongoTypes } from "mongoose"

export interface IUser{
    _id:MongoTypes.ObjectId,
    username:string,
    password:string,
    roleId:string,
    roles: Array<string>
}