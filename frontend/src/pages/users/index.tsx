import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "./UserList";
import { IUser } from "@/redux/interfaces/user/IUser";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    function getUsers() {
      axios
        .get(REQUEST_URL + "/getUsers", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.kullanicilar);
        });
    }

    return () => {
      getUsers();
    };
  }, []);

  return (
    <>
      <div>Users</div>
      <UserList users={users} />
    </>
  );
}

export default Users;
