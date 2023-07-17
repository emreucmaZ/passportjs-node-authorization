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
import React from "react";
import { useFormik } from "formik";
import { IUpdateMenuModalProps } from "./interfaces/IUpdateMenuModalProps";
import updateBlog from "./functions/updateMenu";
import { IImage } from "@/pages/images/interfaces/IImage";
import { UpdateMenuSchema } from "../schemas/UpdateMenuSchema";
import { ICreateUpdateMenuForm } from "./interfaces";
import updateMenu from "./functions/updateMenu";
import { IMenu } from "@/redux/interfaces/menu";
import slugify from "slugify";

function UpdateBlogModal({
  handleClose,
  isVisible,
  menu,
  state,
  menus,
}: IUpdateMenuModalProps) {
  const initialValues: ICreateUpdateMenuForm = {
    _id: menu._id,
    title: menu.title,
    content: menu.content,
    route: menu.route,
    parentId: menu.parentId,
  };

  const formik = useFormik({
    initialValues: {
      _id: menu._id,
      title: menu.title,
      content: menu.content,
      route: menu.route,
      parentId: menu.parentId,
    },
    validationSchema: UpdateMenuSchema,
    onSubmit: (values: ICreateUpdateMenuForm) => {
      updateMenu(values, state, handleClose);
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
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("title", e.currentTarget.value);
                  formik.setFieldValue(
                    "route",
                    slugify(e.currentTarget.value, { lower: true })
                  );
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
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
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                id="route"
                name="route"
                label="route"
                type="route"
                value={formik.values.route}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.route && Boolean(formik.errors.route)}
                helperText={formik.touched.route && formik.errors.route}
              />
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Üst Menü Id
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.parentId}
                  label="Üst Menü Id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.parentId && Boolean(formik.errors.parentId)
                  }
                >
                  <MenuItem
                    sx={{ color: "#d3d3d3" }}
                    onClick={() => {
                      formik.setFieldValue("parentId", "0");
                    }}
                    value={""}
                  >
                    Ana Menü
                  </MenuItem>
                  {menus?.map((menu: IMenu) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          formik.setFieldValue("parentId", menu._id);
                        }}
                        value={menu._id}
                      >
                        {menu.title}
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
