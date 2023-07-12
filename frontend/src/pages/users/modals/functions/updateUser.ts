import axios from "axios";
import { ICreateUpdateUserForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";

export default function updateUser(
  updateUserForm: ICreateUpdateUserForm,
  state: IRootState
) {
  axios
    .put(`${REQUEST_URL}/updateUser/${updateUserForm._id}`, updateUserForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      alert(response.data.updatedUser);
    });
}

