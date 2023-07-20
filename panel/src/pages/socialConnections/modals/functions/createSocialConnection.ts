import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { ICreateUpdateSocialConnectionForm } from "../interfaces";

export default function createSocialConnection(
  createSocialConnectionForm: ICreateUpdateSocialConnectionForm,
  state: IRootState,
  handleClose: Function
) {
  axios
    .post(REQUEST_URL + "/socialConnections", createSocialConnectionForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose();
    });
}
