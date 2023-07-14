import { REQUEST_URL, modalBoxStyle } from "@/variables";
import {
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { IUpdateBlogModalProps } from "./interfaces/IUpdateBlogModalProps";
import { ICreateUpdateBlogForm } from "./interfaces";
import { UpdateBlogSchema } from "../schemas/UpdateBlogSchema";
import updateBlog from "./functions/updateBlog";
import { IImage } from "@/pages/images/interfaces/IImage";

function UpdateBlogModal({
  handleClose,
  isVisible,
  blog,
  state,
  images,
}: IUpdateBlogModalProps) {
  const initialValues: ICreateUpdateBlogForm = {
    _id: blog._id,
    title: blog.title,
    content:blog.content,
    blogImageName:blog.blogImageName
  };  

  const formik = useFormik({
    initialValues: {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      blogImageName: blog.blogImageName
    },
    validationSchema: UpdateBlogSchema,
    onSubmit: (values: ICreateUpdateBlogForm) => {
      updateBlog(values, state, handleClose);
    },
  });

  console.log(formik.values);
  

  return (
    <>
      <Modal onClose={handleClose} open={isVisible}>
        <Box sx={modalBoxStyle}>
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

export default UpdateBlogModal;
