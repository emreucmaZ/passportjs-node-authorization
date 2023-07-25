import { UserDataRow } from "@/pages/users/types";

export type SocialConnectionDataRow = {
    _id:string,
    connectionTitle: string;
  connectionUrl: string;
  connectionImageUrl: string;
  isDeleted:boolean;
  creator:UserDataRow;
}