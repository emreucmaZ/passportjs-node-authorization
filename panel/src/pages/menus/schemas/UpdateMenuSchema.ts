import * as Yup from "yup";

export  const UpdateMenuSchema = Yup.object().shape({
  title: Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Required"),
content: Yup.string().min(2, "Too Short!").required(),
route:Yup.string().required(),
parentId:Yup.string()
  });