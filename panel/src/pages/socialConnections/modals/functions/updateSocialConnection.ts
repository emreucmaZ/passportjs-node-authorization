import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";
import { ICreateUpdateSocialConnectionForm } from "../interfaces";

export default function updateSocialConnection(
  updateSocialConnectionForm: ICreateUpdateSocialConnectionForm,
  state: IRootState,
  handleClose:Function
) {
  axios
    .put(`${REQUEST_URL}/socialConnections/${updateSocialConnectionForm._id}`, updateSocialConnectionForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose()
    });
}

