import React, { useEffect, useState } from "react";
import { IImage } from "./interfaces/IImage";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/interfaces/IRootState";
import Image from "next/image";
import path from "path";

const parentDirectory = path.resolve(__dirname, '..');

function Images() {
  const state = useSelector((state: IRootState) => state);
  const [images, setImages] = useState<IImage[]>();

  useEffect(() => {
    axios
      .get(REQUEST_URL + "/images", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((response) => {
        setImages(response.data.images);
      });
  }, []);

  return (
    <div>
      <div>
        {images?.map((image) => {
          const imgPath = path.join(parentDirectory, 'images',image?.filename?.toString());
          return (
            <>
            <div>{image.title}</div>
            <img
              src={`${REQUEST_URL}/public/images/${image.filename}`}
              width={500}
              height={500}
              alt={image.title}
            />
            </>
            
          );
        })}
      </div>
    </div>
  );
}

export default Images;
