import { modalBoxStyle, permissionList } from "@/variables";
import { Box, Modal, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { IUpdateRoleModalProps } from "./interfaces/IUpdateRoleModalProps";
import { ICreateUpdateRoleForm, IPermission } from "./interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IRole } from "@/redux/interfaces/role/IRole";
import updateRole from "./functions/updateRole";
import Select from "react-select";
import { UpdateRoleSchema } from "../schemas/UpdateRoleSchema";

function UpdateRoleModal({
  handleClose,
  isVisible,
  role,
  state,
  router,
}: IUpdateRoleModalProps) {
  const [permissionOptions, setPermissionOptions] = useState<IPermission[]>(
    permissionList.filter((permission) =>
      role.permissions.includes(permission.value)
    )
  );

  const initialValues: ICreateUpdateRoleForm = {
    _id: role._id,
    name: role.name,
    permissions: role.permissions,
  };
  

  const formik = useFormik({
    initialValues: {
      _id: role._id,
      name: role.name,
      permissions: role.permissions,
    },
    validationSchema: UpdateRoleSchema,
    onSubmit: (values: ICreateUpdateRoleForm) => {
      updateRole(values, state, handleClose);
    },
  });

  return (
    <>
      <Modal onClose={handleClose} open={isVisible}>
        <Box sx={[modalBoxStyle, { width: "50%", height: "50%" }]}>
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

export default UpdateRoleModal;
