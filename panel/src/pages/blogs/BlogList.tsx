import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal, Box } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import { IBlogListProps } from "./interfaces";
import { BlogDataRow } from "./types";
import UpdateBlogModal from "./modals/UpdateBlogModal";
import CreateBlogModal from "./modals/CreateBlogModal";
import DeleteBlogModal from "./modals/DeleteBlogModal";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import updateBlogApprove from "./modals/functions/updateBlogApprove";
import UndoIcon from "@mui/icons-material/Undo";
import updateBlogDeletion from "./modals/functions/updateBlogDeletion";

function BlogList({
  blogs,
  permissions,
  state,
  images,
  router,
  listUnapprovedBlogs,
  setListUnapprovedBlogs,
  setRefreshWhenDataChange,
}: IBlogListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingBlog: null,
    isDeleteModalVisible: false,
    deletingBlogId: null,
    isFullscreenVisible: false,
    selectedImage: null,
  });

  const columns: TableColumn<BlogDataRow>[] = [
    {
      name: "Blog Kapak Resmi",
      cell: (row) => {
        return (
          <>
            <img
              className="cursor-pointer"
              src={`${REQUEST_URL}/public/images/${row.blogImageName}`}
              width={50}
              height={50}
              alt={row.title}
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isFullscreenVisible: true,
                  selectedImage: row.blogImageName,
                });
              }}
            />
          </>
        );
      },
    },
    {
      name: "Blog Id",
      cell: (row) => {
        if (row.isDeleted) {
          return <div className="text-red-600">{row._id}</div>;
        } else {
          return <div>{row._id}</div>;
        }
      },
    },
    {
      name: "Blog title",
      selector: (row) => row.title,
    },
    {
      name: "Creator",
      selector: (row) => row.creator.username,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <span
            className="font-bold py-2 px-4 rounded cursor-pointer"
            onClick={async () => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isUpdateModalVisible: true,
                updatingBlog: row,
              });
            }}
          >
            <EditNoteIcon color="inherit" fontSize="small" />
          </span>

          {row.isDeleted ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                updateBlogDeletion(
                  row._id,
                  !row.isDeleted,
                  state,
                  setRefreshWhenDataChange
                );
              }}
            >
              <UndoIcon color="success" fontSize="small" />
            </span>
          ) : (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setModalVisibles({
                  ...modalVisibles,
                  isDeleteModalVisible: true,
                  deletingBlogId: row._id,
                });
              }}
            >
              <DeleteOutlineIcon color="error" fontSize="small" />
            </span>
          )}
          {listUnapprovedBlogs ? (
            permissions.indexOf("superadmin") > -1 ? (
              <span
                className="font-bold py-2 px-4 rounded cursor-pointer"
                onClick={async () => {
                  setRefreshWhenDataChange(Math.random() * 91238);
                  updateBlogApprove(
                    row._id,
                    true,
                    state,
                    setRefreshWhenDataChange
                  );
                }}
              >
                <CheckCircleOutlineIcon color="success" fontSize="small" />
              </span>
            ) : null
          ) : permissions.indexOf("superadmin") > -1 ? (
            <span
              className="font-bold py-2 px-4 rounded cursor-pointer"
              onClick={async () => {
                setRefreshWhenDataChange(Math.random() * 91238);
                updateBlogApprove(
                  row._id,
                  false,
                  state,
                  setRefreshWhenDataChange
                );
              }}
            >
              <DoNotDisturbIcon color="error" fontSize="small" />
            </span>
          ) : null}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const closeCreateBlogModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isCreateModalVisible: false,
    });
  };

  const closeUpdateBlogModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUpdateModalVisible: false,
      updatingBlog: null,
    });
  };

  const closeDeleteBlogModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isDeleteModalVisible: false,
      deletingBlogId: null,
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
      {modalVisibles.updatingBlog ? (
        <UpdateBlogModal
          router={router}
          state={state}
          images={images}
          blog={modalVisibles.updatingBlog}
          isVisible={modalVisibles.isUpdateModalVisible}
          handleClose={closeUpdateBlogModal}
        />
      ) : null}
      {modalVisibles.deletingBlogId ? (
        <DeleteBlogModal
          router={router}
          state={state}
          blogId={modalVisibles.deletingBlogId}
          isVisible={modalVisibles.isDeleteModalVisible}
          handleClose={closeDeleteBlogModal}
        />
      ) : null}
      <CreateBlogModal
        images={images}
        router={router}
        state={state}
        isVisible={modalVisibles.isCreateModalVisible}
        handleClose={closeCreateBlogModal}
      />
      <Modal
        open={modalVisibles.isFullscreenVisible}
        onClose={closeFullscreenModal}
      >
        <Box sx={[modalBoxStyle, { padding: 0, borderRadius: 0 }]}>
          {modalVisibles.selectedImage && (
            <img
              src={`${REQUEST_URL}/public/images/${modalVisibles.selectedImage}`}
              alt={modalVisibles.selectedImage}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </Box>
      </Modal>
      <div>
        <div className="flex flex-row-reverse">
          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            onClick={() => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isCreateModalVisible: true,
              });
            }}
          >
            Blog Yazısı Ekle
          </Button>
          {permissions.indexOf("superadmin") > -1 ? (
            <>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  setRefreshWhenDataChange(Math.random() * 91238);
                  setListUnapprovedBlogs(!listUnapprovedBlogs);
                }}
              >
                Onaylan{listUnapprovedBlogs ? null : "ma"}mış Blog Yazılarını
                Görüntüle
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              variant="contained"
              onClick={() => {
                setRefreshWhenDataChange(Math.random() * 91238);
                setListUnapprovedBlogs(!listUnapprovedBlogs);
              }}
            >
              Onaylan{listUnapprovedBlogs ? null : "ma"}mış Blog Yazılarımı
              Görüntüle
            </Button>
          )}
        </div>

        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="700px"
          pagination
          responsive
          columns={columns}
          data={blogs}
        />
      </div>
    </>
  );
}

export default BlogList;
