import { modalBoxStyle } from "@/variables";
import {
  Box,
  Modal,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { IUpdateUserModalProps } from "./interfaces/IUpdateUserModalProps";
import { ICreateUpdateUserForm } from "./interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IRole } from "@/redux/interfaces/role/IRole";
import updateUser from "./functions/updateUser";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";

function UpdateUserModal({
  handleClose,
  isVisible,
  user,
  state,
  roles,
  router,
}: IUpdateUserModalProps) {
  const initialValues: ICreateUpdateUserForm = {
    _id: user._id,
    username: user.username,
    password: "",
    roleId: user.roleId,
  };  

  const formik = useFormik({
    initialValues: {
      _id: user._id,
      username: user.username,
      password: "",
      roleId: user.roleId,
    },
    validationSchema: UpdateUserSchema,
    onSubmit: (values: ICreateUpdateUserForm) => {
      updateUser(values, state, handleClose);
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
                >
                  {roles?.map((role: IRole) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          formik.setFieldValue("roleId", role._id);
                        }}
                        value={role._id}
                      >
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

export default UpdateUserModal;
