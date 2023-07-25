import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IUserListProps } from "./interfaces";
import { UserDataRow } from "./types";
import { Button } from "@mui/material";
import CreateUserModal from "./modals/CreateUserModal";
import { useRouter } from "next/router";
import { IRole } from "@/redux/interfaces/role/IRole";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateUserModal from "./modals/UpdateUserModal";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import DeleteUserModal from "./modals/DeleteUserModal";

function UserList({ users, permissions, roles, state, router,setRefreshWhenDataChange}: IUserListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingUser: null,
    isDeleteModalVisible: false,
    deletingUserId: null
  });

  const columns: TableColumn<UserDataRow>[] = [
    {
      name: "User Id",
      selector: (row) => row._id,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Rol",
      selector: (row) => {
        if (permissions?.indexOf("superadmin") > -1) {
          return `${roles?.find((r: IRole) => r._id == row.roleId)?.name}`
        }
        else return 'Yetki Yok'
      }
    },
    {
      name:'Actions',
      cell: (row) => (
        <>
          {permissions?.indexOf("superadmin") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isUpdateModalVisible: true,
                  updatingUser: row
                })
              }}
            >
              <EditNoteIcon color="inherit" fontSize="small" />
            </span>
          ) : null}
          {permissions?.indexOf("superadmin") > -1 ? (
            state.user.username != row.username ? (
              <span
                className="font-bold py-2 px-4 rounded cursor-pointer"
                onClick={async () => {
                  setRefreshWhenDataChange(Math.random() * 91238);
                  setModalVisibles({
                    ...modalVisibles,
                    isDeleteModalVisible: true,
                    deletingUserId: row._id
                  })
                }}
              >
                <DeleteOutlineIcon color="error" fontSize="small" />
              </span>
            ) : <span
              className="font-bold py-2 px-4 rounded cursor-not-allowed"
            >
              <DeleteOutlineIcon color="disabled" fontSize="small" />
            </span>
          ) : null}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const closeCreateUserModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isCreateModalVisible: false,
    });
  };

  const closeUpdateUserModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUpdateModalVisible: false,
      updatingUser: null,
    });
  };

  const closeDeleteUserModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingUserId: null,
    });
  };

  return (
    <>
      {modalVisibles.updatingUser ? (
        <UpdateUserModal
          router={router}
          roles={roles}
          state={state}
          user={modalVisibles.updatingUser}
          isVisible={modalVisibles.isUpdateModalVisible}
          handleClose={closeUpdateUserModal}
        />
      ) : null}
      {modalVisibles.deletingUserId ? (
        <DeleteUserModal
          router={router}
          state={state}
          userId={modalVisibles.deletingUserId}
          isVisible={modalVisibles.isDeleteModalVisible}
          handleClose={closeDeleteUserModal}
        />
      ) : null}
      <CreateUserModal
        router={router}
        roles={roles}
        state={state}
        isVisible={modalVisibles.isCreateModalVisible}
        handleClose={closeCreateUserModal}
      />
      <div>
      {
          permissions?.indexOf("superadmin") > -1 ? (
            <Button
              sx={{display:"flex",marginLeft:"auto"}}
              variant="contained"
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isCreateModalVisible: true,
                });
              }}
            >
              Kullanıcı Ekle
            </Button>
          ) : null
         }
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
