import {
  Box,
  Button,
  TextField,
  Input,
  InputLabel,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { ICreateUpdateBlogForm, ICreateBlogModalProps } from "./interfaces";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import { createBlog } from "./functions";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useFormik } from "formik";
import * as Yup from "yup"
import { CreateBlogSchema } from "../schemas/CreateBlogSchema";
import { IImage } from "@/pages/images/interfaces/IImage";

function CreateBlogModal({ isVisible, handleClose, state,images }: ICreateBlogModalProps) {
  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
      content: "",
      blogImageName: "",
    },
    validationSchema: CreateBlogSchema,
    onSubmit: (values: ICreateUpdateBlogForm) => {
      createBlog(values, state, handleClose)
    },
  });

  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Kullanıcı Ekle</h1>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.title && Boolean(formik.errors.title)
                }
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                id="content"
                name="content"
                label="content"
                type="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.content && Boolean(formik.errors.content)
                }
                helperText={formik.touched.content && formik.errors.content}
              />
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">Blog Resmi</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.blogImageName}
                  label="Blog Resmi"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.blogImageName && Boolean(formik.errors.blogImageName)
                  }
                >
                  {images?.map((image: IImage) => {
                    return (
                      <MenuItem onClick={() => {
                        formik.setFieldValue("blogImageName", image.filename)
                      }} value={image.filename}>
                        <img src={`${REQUEST_URL}/public/images/${image.filename}`} width={30} height={30} />
                        {image.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                sx={{ marginTop: 2 }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CreateBlogModal;
