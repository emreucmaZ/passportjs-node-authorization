import { REQUEST_URL, modalBoxStyle } from "@/variables";
import {
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useRef } from "react";
import { useFormik } from "formik";
import { IUpdateSocialConnectionModalProps } from "./interfaces/IUpdateSocialConnectionModalProps";
import { ICreateUpdateSocialConnectionForm } from "./interfaces";
import { UpdateSocialConnectionSchema } from "../schemas/UpdateSocialConnectionSchema";
import { IImage } from "@/pages/images/interfaces/IImage";
import TextAreaComponent from "@/components/TextAreaComponent";
import updateSocialConnection from "./functions/updateSocialConnection";

function UpdateSocialConnectionModal({
  handleClose,
  isVisible,
  images,
  socialConnection,
  state,
}: IUpdateSocialConnectionModalProps) {
  const editor = useRef<any>();

  const initialValues: ICreateUpdateSocialConnectionForm = {
    _id: socialConnection._id,
    connectionTitle: socialConnection.connectionTitle,
    connectionUrl: socialConnection.connectionUrl,
    connectionImageUrl: socialConnection.connectionImageUrl,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateSocialConnectionSchema,
    onSubmit: (values: ICreateUpdateSocialConnectionForm) => {
      updateSocialConnection(values, state, handleClose);
    },
  });

  return (
    <>
      <Modal onClose={handleClose} open={isVisible}>
        <Box sx={modalBoxStyle}>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="connectionTitle"
                name="connectionTitle"
                label="connectionTitle"
                value={formik.values.connectionTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.connectionTitle &&
                  Boolean(formik.errors.connectionTitle)
                }
                helperText={
                  formik.touched.connectionTitle &&
                  formik.errors.connectionTitle
                }
              />
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                id="connectionUrl"
                name="connectionUrl"
                label="connectionUrl"
                value={formik.values.connectionUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.connectionUrl &&
                  Boolean(formik.errors.connectionUrl)
                }
                helperText={
                  formik.touched.connectionUrl && formik.errors.connectionUrl
                }
              />
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                id="connectionImageUrl"
                name="connectionImageUrl"
                label="connectionImageUrl"
                value={formik.values.connectionImageUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.connectionImageUrl &&
                  Boolean(formik.errors.connectionImageUrl)
                }
                helperText={
                  formik.touched.connectionImageUrl &&
                  formik.errors.connectionImageUrl
                }
              />
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

export default UpdateSocialConnectionModal;
