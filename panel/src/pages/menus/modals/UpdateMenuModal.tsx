import { modalBoxStyle } from "@/variables";
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
import React, { useRef, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { IUpdateMenuModalProps } from "./interfaces/IUpdateMenuModalProps";
import { UpdateMenuSchema } from "../schemas/UpdateMenuSchema";
import { ICreateUpdateMenuForm } from "./interfaces";
import updateMenu from "./functions/updateMenu";
import { IMenu } from "@/redux/interfaces/menu";
import slugify from "slugify";
import { imageUpload } from "./functions/imageUpload";
import dynamic from "next/dynamic";
import TextAreaComponent from "@/components/TextAreaComponent";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function UpdateBlogModal({
  handleClose,
  isVisible,
  menu,
  state,
  menus,
}: IUpdateMenuModalProps) {
  const editor = useRef<any>(null);

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
              <TextAreaComponent editor={editor} formik={formik} state={state} />
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
