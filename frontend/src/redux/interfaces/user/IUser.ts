import { Types as MongoTypes } from "mongoose"

export interface IUser{
    _id:string,
    username:string,
    password:string,
    roleId:string,
    roles: Array<string>
}