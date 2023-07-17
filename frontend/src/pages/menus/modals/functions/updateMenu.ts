import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { ICreateUpdateMenuForm } from "../interfaces";

export default function updateMenu(
  updateMenuForm: ICreateUpdateMenuForm,
  state: IRootState,
  handleClose:Function
) {
  axios
    .put(`${REQUEST_URL}/menus/${updateMenuForm._id}`, updateMenuForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose()
    });
}

