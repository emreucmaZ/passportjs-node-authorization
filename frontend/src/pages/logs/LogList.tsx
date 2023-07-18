import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ILogListProps } from "./interfaces";
import { LogDataRow } from "./types";
import { ILog } from "@/redux/interfaces/log";

function LogList({
  createLogs
}: ILogListProps) {
  const columns: TableColumn<LogDataRow>[] = [
    {
      name: "Değişiklik Yapan Kullanıcı",
      selector: (row) => row.user.username,
    },
  ];

  
  return (
    <>
      <div>
        <div>Create Logs</div>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={createLogs}
        />
      </div>
    </>
  );
}

export default LogList;
