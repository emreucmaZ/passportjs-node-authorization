import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IImageListProps } from "./interfaces";
import { ImageDataRow } from "./types";
import { Button, Modal, Box } from "@mui/material";
import UploadImageModal from "./modals/UploadImageModal";
import DeleteImageModal from "./modals/DeleteImageModal";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";

function ImageList({
  images,
  permissions,
  state,
  setRefreshWhenDataChange,
}: IImageListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isUploadModalVisible: false,
    isDeleteModalVisible: false,
    deletingImageId: null,
    isFullscreenVisible: false,
    selectedImage: null,
  });

  const columns: TableColumn<ImageDataRow>[] = [
    {
      name: "Image",
      cell: (row) => {
        return (
          <img
            className="cursor-pointer"
            src={`${REQUEST_URL}/public/images/${row.filename}`}
            width={50}
            height={50}
            alt={row.title}
            onClick={() => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isFullscreenVisible: true,
                selectedImage: row,
              });
            }}
          />
        );
      },
    },
    {
      name: "Image Id",
      cell: (row) => row._id,
    },
    {
      name: "Image Title",
      cell: (row) => row.title,
    },
    {
      name: "Creator Id",
      cell: (row) => row.creatorId,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {permissions?.indexOf("superadmin") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isDeleteModalVisible: true,
                  deletingImageId: row._id,
                });
              }}
            >
              <DeleteOutlineIcon color="error" fontSize="small" />
            </span>
          ) : row.creatorId == state.user._id ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isDeleteModalVisible: true,
                  deletingImageId: row._id,
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

  const closeFullscreenModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isFullscreenVisible: false,
      selectedImage: null,
    });
  };

  const closeUploadImageModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUploadModalVisible: false,
    });
  };

  const closeDeleteImageModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingImageId: null,
    });
  };

  return (
    <>
      <UploadImageModal
        state={state}
        isVisible={modalVisibles.isUploadModalVisible}
        handleClose={closeUploadImageModal}
      />
      <DeleteImageModal
        state={state}
        isVisible={modalVisibles.isDeleteModalVisible}
        handleClose={closeDeleteImageModal}
        imageId={modalVisibles.deletingImageId}
      />
      <Modal
        open={modalVisibles.isFullscreenVisible}
        onClose={closeFullscreenModal}
      >
        <Box sx={[modalBoxStyle, { padding: 0, borderRadius: 0 }]}>
          {modalVisibles.selectedImage && (
            <img
              src={`${REQUEST_URL}/public/images/${modalVisibles.selectedImage.filename}`}
              alt={modalVisibles.selectedImage.title}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </Box>
      </Modal>
      <div>
        <div>Resim Listesi</div>
          <Button
            sx={{ display: "flex", marginLeft: "auto" }}
            variant="contained"
            onClick={() => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isUploadModalVisible: true,
              });
            }}
          >
            Resim Ekle
          </Button>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={images}
        />
      </div>
    </>
  );
}

export default ImageList;
