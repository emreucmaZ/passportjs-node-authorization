import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "./UserList";
import { getUserPermissions } from "@/helpers";
import { IUser } from "@/redux/interfaces/user";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useRouter } from "next/router";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState();

  useEffect(() => {
    function getUsers() {
      axios
        .get(REQUEST_URL + "/users", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => null);
    }
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
      getUsers();
      getRoles();
    };
  }, [refreshWhenDataChange]);

  return (
    <>
      <div>Users</div>
      <UserList
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
        users={users}
        permissions={permissions}
        roles={roles}
        router={router}
      />
    </>
  );
}

export default Users;
