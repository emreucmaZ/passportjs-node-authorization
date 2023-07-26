import { Box, Button, TextField, Modal } from "@mui/material";
import Select from "react-select";
import React, { useState } from "react";
import { modalBoxStyle, permissionList } from "@/variables";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ICreateRoleModalProps,
  ICreateUpdateRoleForm,
  IPermission,
} from "./interfaces";
import createRole from "./functions/createRole";
import TagsInput from "react-tagsinput";
import { CreateRoleSchema } from "../schemas/CreateRoleSchema";

function CreateRoleModal({
  isVisible,
  handleClose,
  state,
  router,
}: ICreateRoleModalProps) {
  const [permissionOptions, setPermissionOptions] = useState<IPermission[]>([]);


  const formik = useFormik({
    initialValues: {
      _id: null,
      name: "",
      permissions: [],
    },
    validationSchema:CreateRoleSchema,
    onSubmit: (values: ICreateUpdateRoleForm) => {
      createRole(values, state, handleClose);
    },
  });
  
  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={[modalBoxStyle,{width:"50%",height:"50%"}]}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Rol Ekle</h1>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Select
                className="mt-4"
                isMulti
                options={permissionList}
                value={permissionOptions}
                onChange={(selected: any) => {
                  const transformedPermissions = selected.map(
                    (permission: IPermission) => permission.value
                  );
                  setPermissionOptions(selected);
                  formik.setFieldValue("permissions", transformedPermissions);
                }}
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

export default CreateRoleModal;
