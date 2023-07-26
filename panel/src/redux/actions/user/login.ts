import { ILoginForm } from "@/interfaces/ILoginForm";
import { LOG_IN, LOG_OUT } from "@/redux/types/user/types";
import { Dispatch } from "redux";
import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { ActionType } from "@/redux/types/ActionType";
import { IUserAction } from "@/redux/interfaces/user";

export function login (loginForm: ILoginForm) {
  return (dispatch: Dispatch<IUserAction>) => {
    axios
      .post(REQUEST_URL + '/login', loginForm)
      .then((response) => {
        window.location.reload();

        dispatch({
          type: ActionType.LOG_IN,
          payload:{
            token: response.data.response.token,
            username: response.data.response.user.username,
            roleId: response.data.response.user.roleId,
            password: response.data.response.user.password
          }
        });
      })
      .catch((error) =>null);
  };
};

export function logOut() {
  return (dispatch: Dispatch<IUserAction>) => {
    window.location.reload();
    dispatch({
      type: LOG_OUT,
      payload:{
        username: null,
        roleId: null,
        password: null,
        token: null
      }
    });
  };
}
