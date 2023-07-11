import { ActionType } from "@/redux/types/ActionType";
import { IUserState } from "./IUserState";

export interface IUserAction{
    type: ActionType;
    payload:IUserState
}