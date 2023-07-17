import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal, Box } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import { IMenuListProps } from "./interfaces";
import { MenuDataRow } from "./types";
import CreateMenuModal from "./modals/CreateMenuModal";
import DeleteMenuModal from "./modals/DeleteMenuModal";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import UpdateMenuModal from "./modals/UpdateMenuModal";
import { IMenu } from "@/redux/interfaces/menu";
import ParentMenus from "./ParentMenus";

function MenuList({
  menus,
  permissions,
  state,
  router,
  setRefreshWhenDataChange,
}: IMenuListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingMenu: null,
    isDeleteModalVisible: false,
    deletingMenuId: null,
  });
  const [expandedRows, setExpandedRows] = useState<IMenu[]>([]);
  const columns: TableColumn<MenuDataRow>[] = [
    {
      name: "Menü Id",
      selector: (row) => row._id,
    },
    {
      name: "Menü title",
      selector: (row) => row.title,
    },
    {
      name: "Menü Parent Id",
      selector: (row) => row.parentId,
    },
    {
      name:
        permissions?.indexOf("create_menu") > -1 ? (
          <Button
            variant="contained"
            onClick={async () => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isCreateModalVisible: true,
              });
            }}
          >
            Menü Ekle
          </Button>
        ) : (
          "Actions"
        ),
      cell: (row) => (
        <>
          {permissions?.indexOf("update_menu") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isUpdateModalVisible: true,
                  updatingMenu: row,
                });
              }}
            >
              <EditNoteIcon color="inherit" fontSize="small" />
            </span>
          ) : null}
          {permissions?.indexOf("delete_menu") > -1 ? (
            menus.some((menu) => menu.parentId == row._id) ? (
              <span className="font-bold py-2 px-4 rounded cursor-not-allowed">
                <DeleteOutlineIcon color="disabled" fontSize="small" />
              </span>
            ) : (
              <span
                className="font-bold py-2 px-4 rounded cursor-pointer"
                onClick={async () => {
                  setRefreshWhenDataChange(Math.random() * 91238);
                  setModalVisibles({
                    ...modalVisibles,
                    isDeleteModalVisible: true,
                    deletingMenuId: row._id,
                  });
                }}
              >
                <DeleteOutlineIcon color="error" fontSize="small" />
              </span>
            )
          ) : null}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const closeCreateMenuModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isCreateModalVisible: false,
    });
  };

  const closeUpdateMenuModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUpdateModalVisible: false,
      updatingMenu: null,
    });
  };

  const closeDeleteMenuModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingMenuId: null,
    });
  };

  const handleRowExpandToggle = (row: any): void => {
    if (expandedRows.includes(row)) {
      setExpandedRows(
        expandedRows.filter((expandedRow) => expandedRow._id !== row._id)
      );
    } else {
      setExpandedRows([...expandedRows, row]);
    }
  };

  return (
    <>
      {modalVisibles.updatingMenu ? (
        <UpdateMenuModal
          router={router}
          state={state}
          menus={menus}
          menu={modalVisibles.updatingMenu}
          isVisible={modalVisibles.isUpdateModalVisible}
          handleClose={closeUpdateMenuModal}
        />
      ) : null}
      {modalVisibles.deletingMenuId ? (
        <DeleteMenuModal
          router={router}
          state={state}
          menuId={modalVisibles.deletingMenuId}
          isVisible={modalVisibles.isDeleteModalVisible}
          handleClose={closeDeleteMenuModal}
        />
      ) : null}
      <CreateMenuModal
        menus={menus}
        router={router}
        state={state}
        isVisible={modalVisibles.isCreateModalVisible}
        handleClose={closeCreateMenuModal}
      />
      <div>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          expandableRows
          expandableRowExpanded={(row) =>
            menus.filter((menu) => menu.parentId == row._id).includes(row)
          }
          onRowExpandToggled={handleRowExpandToggle}
          expandableRowsComponent={(data: any) => {
            return (
              <ParentMenus
                columns={columns}
                menus={menus}
                parentMenus={menus.filter(
                  (menu) => menu.parentId == data.data._id
                )}
              />
            );
          }}
          columns={columns}
          data={menus.filter((menu) => menu.parentId == "0")}
        />
      </div>
    </>
  );
}

export default MenuList;
