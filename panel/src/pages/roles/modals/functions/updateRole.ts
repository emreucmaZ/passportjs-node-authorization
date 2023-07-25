import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";
import { ICreateUpdateRoleForm } from "../interfaces";

export default function updateRole(
  updateRoleForm: ICreateUpdateRoleForm,
  state: IRootState,
  handleClose:Function
) {
  axios
    .put(`${REQUEST_URL}/roles/${updateRoleForm._id}`, updateRoleForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose();
    });
}

