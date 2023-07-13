import * as Yup from "yup";

export  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    roleId: Yup.string().required("Required"),
  });