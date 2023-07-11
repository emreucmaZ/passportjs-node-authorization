import { ILoginForm } from "@/interfaces/ILoginForm";
import { IUserAction } from "@/redux/interfaces/user/IUserAction";
import { LOG_IN, LOG_OUT } from "@/redux/types/user/types";
import { Dispatch } from "redux";
import axios from "axios";
import { REQUEST_URL } from "@/variables";
import { ActionType } from "@/redux/types/ActionType";

export const login = (loginForm: ILoginForm) => {
  return (dispatch: Dispatch<IUserAction>) => {
    axios
      .post(REQUEST_URL + '/login', loginForm)
      .then((response) => {
        console.log(response);

        dispatch({
          type: ActionType.LOG_IN,
          payload:{
            token: response.data.response.token,
            username: response.data.response.user.username,
            roleId: response.data.response.user.roleId,
            roles: response.data.response.user.roles,
            password: response.data.response.user.password
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export function logOut() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: LOG_OUT,
      token: null,
    });
  };
}
