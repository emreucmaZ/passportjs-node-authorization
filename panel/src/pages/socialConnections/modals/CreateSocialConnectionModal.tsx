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
import {
  ICreateSocialConnectionModalProps,
  ICreateUpdateSocialConnectionForm,
} from "./interfaces";
import { REQUEST_URL, modalBoxStyle } from "@/variables";
import { useFormik } from "formik";
import { CreateSocialConnectionSchema } from "../schemas/CreateSocialConnectionSchema";
import { IImage } from "@/pages/images/interfaces/IImage";
import TextAreaComponent from "@/components/TextAreaComponent";
import createSocialConnection from "./functions/createSocialConnection";

function CreateSocialConnectionModal({
  isVisible,
  handleClose,
  state,
  images
}: ICreateSocialConnectionModalProps) {
  const editor = useRef<any>();
  const formik = useFormik({
    initialValues: {
      _id: "",
      connectionImageUrl: "",
      connectionTitle: "",
      connectionUrl: "",
      creator:null
    },
    validationSchema: CreateSocialConnectionSchema,
    onSubmit: (values: ICreateUpdateSocialConnectionForm) => {
      createSocialConnection(values, state, handleClose);
    },
  });

  useEffect(() => {
    formik.setValues(formik.initialValues);
  }, [isVisible]);

  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Sosyal Bağlantı Ekle</h1>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ marginTop: 2 }}
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
              {
                formik.values.connectionImageUrl ? 
                <img src={formik.values.connectionImageUrl} width={50} height={50} /> : null
              }
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

export default CreateSocialConnectionModal;
