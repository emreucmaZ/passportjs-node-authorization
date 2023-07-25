import { IUserAction, IUserState } from "../interfaces/user";
import { LOG_IN, LOG_OUT } from "../types/user/types";

const initialState: IUserState = {
  token: null,
  username: null,
  roleId: null,
  password: null,
  _id:null
};

export function userReducer(state = initialState, action: IUserAction) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
