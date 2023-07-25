import { IMenu } from "./IMenu";

export interface IMenuWithChildren extends IMenu{
    children:IMenuWithChildren[]
}