import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/helpers";
import { useRouter } from "next/router";
import { IBlog } from "@/redux/interfaces/blog";
import { IImage } from "../images/interfaces/IImage";
import BlogList from "./BlogList";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const router = useRouter();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [unapprovedBlogs, setUnapprovedBlogs] = useState<IBlog[]>([]);
  const [listUnapprovedBlogs, setListUnapprovedBlogs] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState();

  useEffect(() => {
    function getBlogs() {
      axios
        .get(REQUEST_URL + "/getApprovedBlogs", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setBlogs(response.data.blogs);
        })
        .catch((err) => null);
    }
    function getUnapprovedBlogs() {
      axios
        .get(REQUEST_URL + "/getUnapprovedBlogs", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setUnapprovedBlogs(response.data.blogs);
        })
        .catch((err) => null);
    }
    function getImages() {
      axios
        .get(REQUEST_URL + "/images", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setImages(response.data.images);
        })
        .catch((err) => null);
    }
    return () => {
      getUserPermissions(state, setPermissions);
      getBlogs();
      getImages();
      getUnapprovedBlogs();
    };
  }, [refreshWhenDataChange]);

  return (
    <>
      <div>Blogs</div>
      <BlogList
        setListUnapprovedBlogs={setListUnapprovedBlogs}
        listUnapprovedBlogs={listUnapprovedBlogs}
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
        blogs={listUnapprovedBlogs == true ? unapprovedBlogs : blogs}
        images={images}
        permissions={permissions}
        router={router}
      />
    </>
  );
}

export default Users;
