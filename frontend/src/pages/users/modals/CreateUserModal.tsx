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
import { ICreateUpdateUserForm, ICreateUserModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { createUser } from "./functions";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useFormik } from "formik";
import * as Yup from "yup"
import { CreateUserSchema } from "../schemas/CreateUserSchema";

function CreateUserModal({ isVisible, handleClose, roles, state,router }: ICreateUserModalProps) {
  const formik = useFormik({
    initialValues: {
      _id: null,
      username: "",
      password: "",
      roleId: null,
    },
    validationSchema: CreateUserSchema,
    onSubmit: (values: ICreateUpdateUserForm) => {
      createUser(values, state, handleClose)
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
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.roleId}
                  label="Rol"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  {roles?.map((role: IRole) => {
                    return (
                      <MenuItem onClick={() => {
                        formik.setFieldValue("roleId", role._id)
                      }} value={role._id}>
                        {role.name}
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

export default CreateUserModal;
