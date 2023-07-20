import * as Yup from "yup";

export const UpdateSocialConnectionSchema = Yup.object().shape({
  connectionTitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  connectionUrl: Yup.string().min(2, "Too Short!").required(),
  connectionImageUrl: Yup.string().required(),
});
