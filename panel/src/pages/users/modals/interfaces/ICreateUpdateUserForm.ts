import { NextRouter } from "next/router";

export interface ICreateUpdateUserForm{
    _id:string | null,
    username:string,
    password:string,
    roleId:string | null,
}