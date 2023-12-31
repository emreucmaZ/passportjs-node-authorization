import axios from "axios";
import { ICreateUpdateUserForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export default function updateUser(
  updateUserForm: ICreateUpdateUserForm,
  state: IRootState,
  handleClose:Function
) {
  axios
    .put(`${REQUEST_URL}/users/${updateUserForm._id}`, updateUserForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose()
    });
}

