import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/helpers";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useRouter } from "next/router";
import RoleList from "./RoleList";

function Roles() {
  const state = useSelector((state: IRootState) => state);
  const router = useRouter();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState();

  useEffect(() => {
    function getRoles() {
      axios
        .get(REQUEST_URL + "/roles", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setRoles(response.data.roles);
        })
        .catch((err) => null);
    }

    return () => {
      getUserPermissions(state, setPermissions);
      getRoles();
    };
  }, [refreshWhenDataChange]);

  return (
    <>
      <div>Roles</div>
      <RoleList
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
        roles={roles}
        permissions={permissions}
        router={router}
      />
    </>
  );
}

export default Roles;
