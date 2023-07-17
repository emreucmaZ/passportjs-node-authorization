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

const parentDirectory = path.resolve(__dirname, "..");

function Images() {
  const state = useSelector((state: IRootState) => state);
  const [images, setImages] = useState<IImage[]>();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState<number>();
  const [modalVisibles, setModalVisibles] = useState<IModalVisibles>({
    isUploadModalVisible: false,
    isDeleteModalVisible: false,
    deletingImageId: null,
  });

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

  
  const closeUploadImageModal = () => {
    setRefreshWhenDataChange(Math.random() * 91238);
    setModalVisibles({
      ...modalVisibles,
      isUploadModalVisible:false
    });
  };

  return (
    <div>
      <div>
        {images?.map((image) => {
          const imgPath = path.join(
            parentDirectory,
            "images",
            image?.filename?.toString()
          );
          return (
            <>
              <div>{image.title}</div>
              <img
                src={`${REQUEST_URL}/public/images/${image.filename}`}
                width={200}
                height={200}
                alt={image.title}
              />
            </>
          );
        })}
      </div>
      <div>
        {permissions?.indexOf("upload_image") > -1 ? (
          <Button
            onClick={() => {
              setRefreshWhenDataChange(Math.random() * 91238);
              setModalVisibles({
                ...modalVisibles,
                isUploadModalVisible: true,
              });
            }}
            variant="contained"
          >
            Resim Yükle
          </Button>
        ) : null}
      </div>
      <UploadImageModal
        state={state}
        isVisible={modalVisibles.isUploadModalVisible}
        handleClose={closeUploadImageModal}
      />
    </div>
  );
}

export default Images;
