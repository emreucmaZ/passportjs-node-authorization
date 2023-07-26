import {
  Box,
  Button,
  TextField,
  InputLabel,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { ICreateUpdateBlogForm, ICreateBlogModalProps } from "./interfaces";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import { createBlog } from "./functions";
import { useFormik } from "formik";
import { CreateBlogSchema } from "../schemas/CreateBlogSchema";
import { IImage } from "@/pages/images/interfaces/IImage";
import TextAreaComponent from "@/components/TextAreaComponent";

function CreateBlogModal({ isVisible, handleClose, state,images }: ICreateBlogModalProps) {
  const editor = useRef<any>();
  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
      content: "",
      blogImageName: "",
      creator:null,
      isApproved:false,
      isDeleted:false
    },
    validationSchema: CreateBlogSchema,
    onSubmit: (values: ICreateUpdateBlogForm) => {
      createBlog(values, state, handleClose)
    },
  });

  useEffect(() => {
  
    formik.setValues(formik.initialValues)
  }, [isVisible])
  

  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={[modalBoxStyle,{width:"80%"}]}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Blog Yazısı Ekle</h1>
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
              <TextAreaComponent editor={editor} formik={formik} state={state}/>
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
