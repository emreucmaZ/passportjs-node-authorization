import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { ICreateUpdateMenuForm } from "../interfaces";

export default function createMenu(
  createMenuForm: ICreateUpdateMenuForm,
  state: IRootState,
  handleClose: Function
) {
  axios
    .post(REQUEST_URL + "/menus", createMenuForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose();
    });
}
