import { IPermission } from "./pages/roles/modals/interfaces";

export const REQUEST_URL = "http://192.168.56.1:5002";

export const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "block !important",
  overflowY: "auto",
  maxHeight: "80vh",
  borderRadius: 2,
  p: 4,
};
export const permissionList: IPermission[] = [
  { value: "superadmin", label: "Süper Admin" },
  { value: "create_menu", label: "Menü Ekleme" },
  { value: "delete_menu", label: "Menü Silme" },
  { value: "update_menu", label: "Menü Düzenleme" },
  { value: "get_blogs", label: "Blog Çekme" },
  { value: "create_blog", label: "Blog Ekleme" },
  { value: "update_blog", label: "Blog Düzenleme" },
  { value: "delete_blog", label: "Blog Silme" },
  { value: "upload_image", label: "Resim Ekleme" },
  { value: "delete_image", label: "Resim Silme" },
];
