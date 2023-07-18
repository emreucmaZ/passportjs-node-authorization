import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "./LogList";
import { getUserPermissions } from "@/helpers";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useRouter } from "next/router";
import { IBlog } from "@/redux/interfaces/blog";
import { IImage } from "../images/interfaces/IImage";
import { IMenu } from "@/redux/interfaces/menu";
import { ILog } from "@/redux/interfaces/log";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const [createLogs, setCreateLogs] = useState<ILog[]>([]);

  useEffect(() => {
    function getCreateLogs() {
      axios
        .get(REQUEST_URL + "/logs", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          console.log(response);

          setCreateLogs(response.data.logs.createLogs);
        })
        .catch((err) => null);
    }

    return () => {
      getCreateLogs();
    };
  }, []);
  console.log(createLogs);

  return (
    <>
      <UserList createLogs={createLogs} />
    </>
  );
}

export default Users;
