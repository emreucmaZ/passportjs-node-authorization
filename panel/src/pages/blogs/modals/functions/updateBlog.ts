import axios from "axios";
import { ICreateUpdateBlogForm } from "../interfaces";
import { REQUEST_URL } from "@/variables";
import { IRootState } from "@/redux/interfaces/IRootState";
import { NextRouter } from "next/router";

export default function updateBlog(
  updateBlogForm: ICreateUpdateBlogForm,
  state: IRootState,
  handleClose:Function
) {
  axios
    .put(`${REQUEST_URL}/blogs/${updateBlogForm._id}`, updateBlogForm, {
      headers: {
        Authorization: `Bearer  ${state.user.token}`,
      },
    })
    .then((response) => {
      handleClose()
    });
}

