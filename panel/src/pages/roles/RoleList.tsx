import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IRoleListProps } from "./interfaces";
import { RoleDataRow } from "./types";
import { Button } from "@mui/material";
import CreateRoleModal from "./modals/CreateRoleModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateRoleModal from "./modals/UpdateRoleModal";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import DeleteRoleModal from "./modals/DeleteRoleModal";

function RoleList({
  roles,
  permissions,
  state,
  router,
  setRefreshWhenDataChange,
}: IRoleListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingRole: null,
    isDeleteModalVisible: false,
    deletingRoleId: null,
  });

  const columns: TableColumn<RoleDataRow>[] = [
    {
      name: "Role Id",
      selector: (row) => row._id,
    },
    {
      name: "Role Name",
      selector: (row) => row.name,
    },
    {
      name:'Actions',
      cell: (row) => (
        <>
          {permissions?.indexOf("superadmin") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isUpdateModalVisible: true,
                  updatingRole: row,
                });
              }}
            >
              <EditNoteIcon color="inherit" fontSize="small" />
            </span>
          ) : null}
          {permissions?.indexOf("superadmin") > -1 ? (
            state.user.roleId != row._id ? (
              <span
                className="font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => {
                  setRefreshWhenDataChange(Math.random() * 91238);
                  setModalVisibles({
                    ...modalVisibles,
                    isDeleteModalVisible: true,
                    deletingRoleId: row._id,
                  });
                }}
              >
                <DeleteOutlineIcon color="error" fontSize="small" />
              </span>
            ) : (
              <span className="font-bold py-2 px-4 rounded cursor-not-allowed">
                <DeleteOutlineIcon color="disabled" fontSize="small" />
              </span>
            )
          ) : null}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const closeCreateRoleModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isCreateModalVisible: false,
    });
  };

  const closeUpdateRoleModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUpdateModalVisible: false,
      updatingRole: null,
    });
  };

  const closeDeleteRoleModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingRoleId: null,
    });
  };

  return (
    <>
      {modalVisibles.updatingRole ? (
        <UpdateRoleModal
          state={state}
          router={router}
          role={modalVisibles.updatingRole}
          isVisible={modalVisibles.isUpdateModalVisible}
          handleClose={closeUpdateRoleModal}
        />
      ) : null}
      {modalVisibles.deletingRoleId ? (
        <DeleteRoleModal
          state={state}
          router={router}
          roleId={modalVisibles.deletingRoleId}
          isVisible={modalVisibles.isDeleteModalVisible}
          handleClose={closeDeleteRoleModal}
        />
      ) : null}
      <CreateRoleModal
        router={router}
        state={state}
        isVisible={modalVisibles.isCreateModalVisible}
        handleClose={closeCreateRoleModal}
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
              Rol Ekle
            </Button>
          ) : null
         }
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={roles}
        />
      </div>
    </>
  );
}

export default RoleList;
