import { IMenu } from "@/redux/interfaces/menu";
import { MenuDataRow } from "../types";
import { TableColumn } from "react-data-table-component";

export interface IParentMenusListProps{
    menus: IMenu[],
    parentMenus:IMenu[],
    columns:TableColumn<MenuDataRow>[]
}