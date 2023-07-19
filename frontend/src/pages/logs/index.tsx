import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "./LogList";
import { ILog } from "@/redux/interfaces/log";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const [entityLogs, setEntityLogs] = useState<ILog[]>([]);

  useEffect(() => {
    function getEntityLogs() {
      axios
        .get(REQUEST_URL + "/entityLogs", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setEntityLogs(response.data.logs);
        })
        .catch((err) => null);
    }

    return () => {
      getEntityLogs();
    };
  }, []);

  return (
    <>
      <UserList entityLogs={entityLogs} />
    </>
  );
}

export default Users;
