import React, { useState } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import { ILogListProps } from "./interfaces";
import { LogDataRow } from "./types";
import { formatDateTime } from "@/utils/dateUtils";
import { ILog } from "@/redux/interfaces/log";
import { logTypes, tables } from "@/variables";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ConditionalStylesLogDataRow {
  when: (row: LogDataRow) => boolean;
  style: React.CSSProperties;
}

const LogList: React.FC<ILogListProps> = ({ entityLogs }) => {
  const columns: TableColumn<ILog>[] = [
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

  const [selectedLogType, setSelectedLogType] = useState<string>("all");
  const [selectedTable, setSelectedTable] = useState<string>("all");

  const filteredData = entityLogs.filter((row) => {
    if (selectedLogType === "all" && selectedTable === "all") {
      return true; // Tüm verileri göster
    } else if (selectedLogType === "all") {
      return row.table === selectedTable; // Sadece seçilen tabloya göre filtrele
    } else if (selectedTable === "all") {
      return row.type === selectedLogType; // Sadece seçilen log türüne göre filtrele
    } else {
      return row.type === selectedLogType && row.table === selectedTable; // Her ikisine göre filtrele
    }
  });

  const conditionalRowStyles = [
    {
      when: (row: LogDataRow) => row.type == "create",
      style: {
        backgroundColor: "#6aae6a",
        color: "white",
      },
    },
    {
      when: (row: LogDataRow) => row.type == "delete",
      style: {
        backgroundColor: "#FF6666",
        color: "white",
      },
    },
    {
      when: (row: LogDataRow) => row.type == "update",
      style: {
        backgroundColor: "#FF9933",
        color: "white",
      },
    },
  ];

  return (
    <>
      <div>
        <div>
          <FormControl sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-label">Değişiklik Tipleri</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLogType}
              label="Değişiklik Tipleri"
              onChange={(e) => setSelectedLogType(e.target.value)}
            >
              <MenuItem value={"all"}>Tüm Değişiklikler</MenuItem>
              {logTypes?.map((logType) => {
                return <MenuItem value={logType}>{logType}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: 2,marginLeft:2 }}>
            <InputLabel id="demo-simple-select-label">Değişiklik Yapılan Tablo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTable}
              label="Değişiklik Yapılan Tablo"
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <MenuItem value={"all"}>Tüm Tablolar</MenuItem>
              {tables?.map((table) => {
                return <MenuItem value={table}>{table}</MenuItem>;
              })}
            </Select>
          </FormControl>
          
        </div>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={filteredData}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </>
  );
};

export default LogList;
