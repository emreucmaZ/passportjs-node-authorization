import { IPermission } from "./pages/roles/modals/interfaces";

export const REQUEST_URL = "http://localhost:5002";

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
  { value: "update_menu", label: "Menü Düzenleme" }
];

export const logTypes: string[] = ["create", "update", "delete","signup"];
export const tables: string[] = ["users", "roles", "menus","images","blogs","socialConnections"];