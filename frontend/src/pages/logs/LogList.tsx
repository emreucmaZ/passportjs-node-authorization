import React from "react";
import DataTable, { ConditionalStyles, TableColumn, TableStyles } from "react-data-table-component";
import { ILogListProps } from "./interfaces";
import { LogDataRow } from "./types";
import { formatDateTime } from "@/utils/dateUtils";

function LogList({
  entityLogs
}: ILogListProps) {
  const columns: TableColumn<LogDataRow>[] = [
    {
      name: "Değişiklik Tipi",
      selector: (row) => row.type,
    },
    {
      name: "Değişiklik Yapan Kullanıcı",
      selector: (row) => row.user.username,
    },
    {
      name: "Değişiklik Yapılan Tablo",
      selector: (row) => row.table,
    },
    {
      name: "Değişiklik Saati",
      selector: (row) => formatDateTime(row.timestamp),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row:LogDataRow) => row.type == "create",
      style: {
        backgroundColor: '#6aae6a',
        color: 'white',
      },
    },
    {
      when: (row:LogDataRow) => row.type == "delete",
      style: {
        backgroundColor: '#FF6666',
        color: 'white',
      },
    },
    {
      when: (row:LogDataRow) => row.type == "update",
      style: {
        backgroundColor: '#FF9933',
        color: 'white',
      },
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
          data={entityLogs}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </>
  );
}

export default LogList;
