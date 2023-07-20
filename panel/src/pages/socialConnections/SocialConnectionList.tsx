import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal, Box } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import { SocialConnectionDataRow } from "./types";
import { ISocialConnectionListProps } from "./interfaces";
import UpdateSocialConnectionModal from "./modals/UpdateSocialConnectionModal";
import DeleteSocialConnectionModal from "./modals/DeleteSocialConnectionModal";
import CreateSocialConnectionModal from "./modals/CreateSocialConnectionModal";
import openURL from "@/helpers/openUrl";

function SocialConnectionList({
  socialConnections,
  permissions,
  state,
  images,
  router,
  setRefreshWhenDataChange,
}: ISocialConnectionListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingSocialConnection: null,
    isDeleteModalVisible: false,
    deletingSocialConnectionId: null,
    isFullscreenVisible: false,
    selectedImage: null,
  });

  const columns: TableColumn<SocialConnectionDataRow>[] = [
    {
      name: "Sosyal Bağlantı Resmi",
      cell: (row) => {
        return (
          <>
            <img
              className="cursor-pointer"
              src={`${REQUEST_URL}/public/images/${row.connectionImageUrl}`}
              width={30}
              height={30}
              alt={row.connectionUrl}
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isFullscreenVisible: true,
                  selectedImage: row.connectionImageUrl,
                });
              }}
            />
          </>
        );
      },
    },
    {
      name: "Sosyal Bağlantı Id",
      selector: (row) => row._id,
    },
    {
      name: "Sosyal Bağlantı title",
      selector: (row) => row.connectionTitle,
    },
    {
      name: "Sosyal Bağlantı Link",
      cell: (row) => (
        <a className="cursor-pointer" onClick={(e)=>{
          console.log("asd");
          e.preventDefault();
          openURL(row.connectionUrl)
        }} target="_blank">
          {row.connectionUrl}
        </a>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {permissions?.indexOf("update_social_connection") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isUpdateModalVisible: true,
                  updatingSocialConnection: row,
                });
              }}
            >
              <EditNoteIcon color="inherit" fontSize="small" />
            </span>
          ) : null}
          {permissions?.indexOf("delete_social_connection") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isDeleteModalVisible: true,
                  deletingSocialConnectionId: row._id,
                });
              }}
            >
              <DeleteOutlineIcon color="error" fontSize="small" />
            </span>
          ) : null}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const closeCreateSocialConnectionModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isCreateModalVisible: false,
    });
  };

  const closeUpdateSocialConnectionModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUpdateModalVisible: false,
      updatingSocialConnection: null,
    });
  };

  const closeDeleteSocialConnectionModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingSocialConnectionId: null,
    });
  };

  const closeFullscreenModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isFullscreenVisible: false,
      selectedImage: null,
    });
  };

  return (
    <>
      {modalVisibles.updatingSocialConnection ? (
        <UpdateSocialConnectionModal
          images={images}
          router={router}
          state={state}
          socialConnection={modalVisibles.updatingSocialConnection}
          isVisible={modalVisibles.isUpdateModalVisible}
          handleClose={closeUpdateSocialConnectionModal}
        />
      ) : null}
      {modalVisibles.deletingSocialConnectionId ? (
        <DeleteSocialConnectionModal
          state={state}
          socialConnectionId={modalVisibles.deletingSocialConnectionId}
          isVisible={modalVisibles.isDeleteModalVisible}
          handleClose={closeDeleteSocialConnectionModal}
        />
      ) : null}
      <CreateSocialConnectionModal
        images={images}
        state={state}
        isVisible={modalVisibles.isCreateModalVisible}
        handleClose={closeCreateSocialConnectionModal}
      />
      <div>
        {permissions?.indexOf("create_social_connection") > -1 ? (
          <Button
            sx={{ display: "flex", marginLeft: "auto" }}
            variant="contained"
            onClick={() => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isCreateModalVisible: true,
              });
            }}
          >
            Sosyal Bağlantıyı Ekle
          </Button>
        ) : null}
        <Modal
          open={modalVisibles.isFullscreenVisible}
          onClose={closeFullscreenModal}
        >
          <Box
            sx={[
              modalBoxStyle,
              { padding: 0, borderRadius: 0, width: "auto " },
            ]}
          >
            {modalVisibles.selectedImage && (
              <img
                src={REQUEST_URL + '/public/images/' +modalVisibles.selectedImage}
                alt={modalVisibles.selectedImage}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </Box>
        </Modal>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={socialConnections}
        />
      </div>
    </>
  );
}

export default SocialConnectionList;
