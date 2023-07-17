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
import { IUploadImageForm, IUploadImageModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { uploadImage } from "./functions";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UploadImageSchema } from "../schemas/UploadImageSchema";

function UploadImageModal({
  isVisible,
  handleClose,
  state,
}: IUploadImageModalProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
    },
    validationSchema: UploadImageSchema,
    onSubmit: (values: IUploadImageForm) => {
      uploadImage(values, state, handleClose);
    },
  });

  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Resim Ekle</h1>
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
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <input
                onChange={(e: any) =>
                  formik.setFieldValue("image", e.target.files[0])
                }
                type="file"
                accept="image/*"
              ></input>

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

export default UploadImageModal;
