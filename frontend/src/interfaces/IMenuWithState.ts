import { IMenu } from "./IMenu";

export interface IMenuWithState extends IMenu {
    anchorEl: HTMLElement | null;
    isOpen: boolean;
  }