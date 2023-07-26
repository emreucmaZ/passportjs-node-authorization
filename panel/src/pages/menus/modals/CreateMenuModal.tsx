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
import { ICreateUpdateMenuForm, ICreateMenuModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { createMenu } from "./functions";
import { useFormik } from "formik";
import { CreateMenuSchema } from "../schemas/CreateMenuSchema";
import { IMenu } from "@/redux/interfaces/menu";
import slugify from "slugify";
import TextAreaComponent from "../../../components/TextAreaComponent";

function CreateMenuModal({
  isVisible,
  handleClose,
  state,
  menus,
}: ICreateMenuModalProps) {
  const editor = useRef<any>(null);
  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
      content: "",
      route: "",
      parentId: "0",
    },
    validationSchema: CreateMenuSchema,
    onSubmit: (values: ICreateUpdateMenuForm) => {
      createMenu(values, state, handleClose);
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
              <h1 className="font-bold text-xl">Menü Ekle</h1>
            </div>

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
                <TextAreaComponent formik={formik} editor={editor} state={state} />
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

export default CreateMenuModal;
