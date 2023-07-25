import * as Yup from "yup";

export const UpdateRoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  permissions: Yup.array().of(Yup.string()),
});
