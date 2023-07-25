import { IMenu } from "@/interfaces";

export function findChildMenus(menuId: string,menus:IMenu[]): (IMenu & { children?: (IMenu & { children?: IMenu[] })[] })[] {
    const childMenus: IMenu[] = menus.filter((menu) => menu.parentId === menuId);
  
    if (childMenus.length === 0) {
      return [];
    }
  
    return childMenus.map((menu) => ({
      ...menu,
      children: findChildMenus(menu._id,menus),
    }));
  }