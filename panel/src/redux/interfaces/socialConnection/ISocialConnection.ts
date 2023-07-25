import { UserDataRow } from "@/pages/users/types";

export interface ISocialConnection {
    _id:string,
  connectionTitle: string;
  connectionUrl: string;
  connectionImageUrl: string;
  creator:UserDataRow;
}
