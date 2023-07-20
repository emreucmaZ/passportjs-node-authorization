import React, { useEffect, useState } from "react";
import { IImage } from "./interfaces/IImage";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/interfaces/IRootState";
import Image from "next/image";
import path from "path";
import { Button } from "@mui/material";
import { getUserPermissions } from "@/helpers";
import { IModalVisibles } from "./modals/interfaces/IModalVisibles";
import UploadImageModal from "./modals/UploadImageModal";
import ImageList from "./ImageList";

const parentDirectory = path.resolve(__dirname, "..");

function Images() {
  const state = useSelector((state: IRootState) => state);
  const [images, setImages] = useState<IImage[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState<number>();
  
  useEffect(() => {
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
      getImages();
    };
  }, [refreshWhenDataChange]);

  return (
    <div>
      <ImageList
        images={images}
        permissions={permissions}
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
      />
    </div>
  );
}

export default Images;
