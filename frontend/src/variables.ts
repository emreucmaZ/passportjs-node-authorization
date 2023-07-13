import { IPermission } from "./pages/roles/modals/interfaces";

export const REQUEST_URL = "http://localhost:5002";

export const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "30%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
export const permissionList: IPermission[] = [
  { value: "superadmin", label: "Süper Admin" },
  { value: "add_menu", label: "Menü Ekleme" },
  { value: "delete_menu", label: "Menü Silme" },
  { value: "create_blog", label: "Blog Ekleme" },
];
