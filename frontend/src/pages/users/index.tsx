import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "./UserList";
import { getUserPermissions } from "@/helpers";
import { IUser } from "@/redux/interfaces/user";
import { IRole } from "@/redux/interfaces/role/IRole";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions,setPermissions] = useState<string[]>([]);

  useEffect(() => {
    function getUsers() {
      axios
        .get(REQUEST_URL + "/getUsers", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        }).catch(err=>null);
    }
    function getRoles() {
      axios
        .get(REQUEST_URL + "/getRoles", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setRoles(response.data.roles);
        }).catch(err=>null);
    }

    return () => {
      getUserPermissions(state,setPermissions)
      getUsers();
      getRoles();
    };
  }, []);

  return (
    <>
      <div>Users</div>
      <UserList state={state} users={users} permissions={permissions} roles={roles} />
    </>
  );
}

export default Users;
