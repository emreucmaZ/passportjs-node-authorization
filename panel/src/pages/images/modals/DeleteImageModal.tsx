import {
  Box,
  Button,
  Modal
} from "@mui/material";
import React, { useState } from "react";
import { modalBoxStyle } from "@/variables";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useFormik } from "formik";
import * as Yup from "yup"
import { IDeleteImageModalProps } from "./interfaces";
import { deleteImage } from "./functions";

function DeleteImageModal({ isVisible, handleClose, state, imageId}: IDeleteImageModalProps) {
  return (
      <>
          <Modal open={isVisible} onClose={handleClose}>
              <Box sx={modalBoxStyle}>
                  <div className="mb-8">
                      <h1 className="font-bold text-xl">Resmi Sil</h1>
                  </div>

                  <div>
                      <Button variant="contained" color="error" onClick={() => {
                          deleteImage(imageId, state, handleClose);
                      }}>
                          Resmi Sil
                      </Button>
                  </div>
              </Box>
          </Modal>
      </>
  );
}

export default DeleteImageModal;
