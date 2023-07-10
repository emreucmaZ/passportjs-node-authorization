import IAuthAction from "../interfaces/IAuthAction";
import { LOG_IN, LOG_OUT } from "../types";

const initalState = {
  token: null,
};

export default function authReducer(state = initalState, action: IAuthAction) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.token,
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
