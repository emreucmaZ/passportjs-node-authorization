import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/helpers";
import { useRouter } from "next/router";
import { IMenu } from "@/redux/interfaces/menu";
import MenuList from "./MenuList";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const router = useRouter();
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState();

  useEffect(() => {
    function getMenus() {
      axios
        .get(REQUEST_URL + "/menus", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setMenus(response.data.menus);
        })
        .catch((err) => null);
    }
    
    return () => {
      getUserPermissions(state, setPermissions);
      getMenus();
    };
  }, [refreshWhenDataChange]);

  return (
    <>
      <div>Blogs</div>
      <MenuList
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
        menus={menus}
        permissions={permissions}
        router={router}
      />
    </>
  );
}

export default Users;
