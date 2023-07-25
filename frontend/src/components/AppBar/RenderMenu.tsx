import { IMenu } from "@/interfaces";
import { IMenuWithChildren } from "@/interfaces/IMenuWithChildren";
import * as React from "react";

interface IRenderMenuProps {
  menu: IMenuWithChildren;
}

export function RenderMenu({ menu }: IRenderMenuProps) {
  return (
    <>
      {menu.title} | &nbsp;
     
    </>
  );
}
