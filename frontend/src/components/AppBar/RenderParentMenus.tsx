import { IMenu } from "@/interfaces";
import { Button, Menu, MenuItem } from "@mui/material";
import * as React from "react";

interface MenuWithState extends IMenu {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
}

export function RenderParentMenus(
  menu: MenuWithState & { children?: MenuWithState[] },
  depth: number,
): JSX.Element[] {

  const menuItems: JSX.Element[] = [];

  if (menu?.children?.length) {
    menuItems.push(
      <React.Fragment key={menu._id}>
        <Menu
          id={`menu-${menu._id}`}
          open={menu.isOpen}
          MenuListProps={{
            'aria-labelledby': `menu-button-${menu._id}`,
          }}
        >
          {menu.children.map((child) => (
            <MenuItem key={child._id} >
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }

  if (menu.children) {
    menu.children.forEach((child) => {
      menuItems.push(...RenderParentMenus(child, depth + 1));
    });
  }

  return menuItems;
}