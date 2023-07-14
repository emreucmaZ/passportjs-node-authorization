import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import { IBlogListProps } from "./interfaces";
import { BlogDataRow } from "./types";
import UpdateBlogModal from "./modals/UpdateBlogModal";
import CreateBlogModal from "./modals/CreateBlogModal";
import DeleteBlogModal from "./modals/DeleteBlogModal";
import { REQUEST_URL } from "@/variables";

function BlogList({
  blogs,
  permissions,
  state,
  images,
  router,
  setRefreshWhenDataChange,
}: IBlogListProps) {
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    updatingBlog: null,
    isDeleteModalVisible: false,
    deletingBlogId: null,
  });

  const columns: TableColumn<BlogDataRow>[] = [
    {
      name: "Blog Kapak Resmi",
      selector: (row:any) => {
        return (
          <>
            <img
              src={`${REQUEST_URL}/public/images/${row.blogImageName}`}
              width={50}
              height={50}
              alt={row.title}
            />
          </>
        );
      },
    },
    {
      name: "Blog Id",
      selector: (row) => row._id,
    },
    {
      name: "Blog title",
      selector: (row) => row.title,
    },
    {
      name:
        permissions?.indexOf("create_blog") > -1 ? (
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
            Blog Ekle
          </Button>
        ) : (
          "Actions"
        ),
      cell: (row) => (
        <>
          {permissions?.indexOf("update_blog") > -1 ? (
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
          ) : null}
          {permissions?.indexOf("delete_blog") > -1 ? (
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
      <div>
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
