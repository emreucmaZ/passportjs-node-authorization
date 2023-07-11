import React from "react";
import DataTable from "react-data-table-component";
import { IUserListProps } from "./interfaces/IUserListProps";
import { IUser } from "@/redux/interfaces/user/IUser";

function UserList({ users }: IUserListProps) {
  const columns  = [
    {
      name: "User Id",
      selector: (row: IUser) => row._id,
    },
    {
      name: "Username",
      selector: (row: IUser) => row.username,
    },
    {
      name: "RolId",
      selector: (row: IUser) => row.roleId,
    },
  ];

  return (
    <>
      <div>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={users}
        />
      </div>
    </>
  );
}

export default UserList;
