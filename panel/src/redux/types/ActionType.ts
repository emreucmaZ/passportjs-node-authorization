import { LOG_IN,LOG_OUT } from "./user/types";

export const ActionType = {
    LOG_IN,
    LOG_OUT,
  } as const;
  
  export type ActionType = typeof ActionType[keyof typeof ActionType];