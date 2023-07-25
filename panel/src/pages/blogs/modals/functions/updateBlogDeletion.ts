import axios from "axios";
import { ICreateUpdateBlogForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export default function updateBlogDeletion(
  updatingBlogId: string,
  isDeleted:boolean = false,
  state: IRootState,
  setRefreshWhenDataChange:Function
) {
  axios
    .put(`${REQUEST_URL}/blogDeletion/${updatingBlogId}`, {isDeleted:isDeleted}, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
        setRefreshWhenDataChange(Math.random() * 91238);
    });
}

